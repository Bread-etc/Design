<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2" style="height: 10%">设备管理</h4>
		<div class="d-flex pt-2 gap-5" style="height: 90%">
			<!-- 设备 Item 直接操作设备 -->
			<div
				v-for="item in deviceList"
				:key="item.id"
				class="d-flex flex-column align-items-center text-center mx-3"
			>
				<img src="../../assets/images/device_card.webp" class="user-select-none" alt="设备图片" />

				<!-- 设备名称 -->
				<div class="mt-2 fw-bold user-select-none" style="font-size: 14px">
					<a-button ghost block size="small" @click="showSwitchModal(item)">{{
						item.name
					}}</a-button>
				</div>
				<a-tag color="green" class="me-0 mt-2" v-if="item.states === 'online'">在线</a-tag>
				<a-tag color="red" class="me-0 mt-2" v-else>离线</a-tag>
			</div>
		</div>

		<!-- 模态框 -->
		<a-modal
			:open="open"
			ok-text="确认"
			cancel-text="取消"
			title="设置开关"
			@ok="handleConfirm"
			@cancel="hideSwitchModal"
		>
			<div v-if="selectedDevice" class="p-1">
				<div
					v-if="selectedDevice.cloud_state?.length"
					v-for="switchKey in selectedDevice.cloud_state"
					:key="switchKey"
					class="d-flex align-items-center py-2 justify-content-between"
				>
					<span class="me-2">{{ switchKey }}:</span>
					<a-switch v-model:checked="switchStates[switchKey]" />
				</div>
				<div v-else>暂无可用开关</div>
			</div>
		</a-modal>
	</div>
</template>

<script lang="ts" setup>
import type { DeviceGetAllDevTypeParams } from "@/api/interface/device/DeviceGetAllDevType";
import type { DeviceGetGroupParams } from "@/api/interface/device/DeviceGetGroup";
import type { DeviceGetStatusParams } from "@/api/interface/device/DeviceGetStatus";
import type { DeviceSetStatusParams } from "@/api/interface/device/DeviceSetStatus";
import deviceGetAllDevTypeService from "@/api/service/device/deviceGetAllDevTypeService";
import deviceGetGroupService from "@/api/service/device/deviceGetGroupService";
import deviceGetStatusService from "@/api/service/device/deviceGetStatusService";
import deviceSetStatusService from "@/api/service/device/deviceSetStatusService";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

/*
	1、先获取到所有的 硬件类型 type_id
	2、type_id 放入 params 后请求 getGroup 得到已有且可以操作的设备
	3、将第一步得到的 res 与第二步得到的数组进行比对，放入用于展示的 type_name
	4、发送 getStatus 获取到可操作设备的所有开关
	5、合并可用的开关名称、渲染开关
	6、根据返回的参数构建params，发送设置状态请求
*/

/* 类型 */
type Device = {
	deviceId: string;
	deviceName: string;
	id: string;
	leaf: boolean;
	typeId: string;
	typeName: string;
	name?: string;
	cloud_state?: string[];
	states?: "online" | "offline";
};

/* 变量 */
const deviceList = ref<Device[]>([]);
const hardwareTypeList = ref<{ type_id: string; type_name: string; model: string }[]>([]);
const open = ref<boolean>(false);
// 选中的设备
const selectedDevice = ref<Device | null>(null);
const switchStates = ref<Record<string, boolean>>({});

/* 网络请求 */
const handleGetAllDevType = async (params: DeviceGetAllDevTypeParams) => {
	try {
		const res = await deviceGetAllDevTypeService.getAllDevType(params);
		hardwareTypeList.value = res.data;
	} catch (error) {
		console.error(error);
	}
};
const handleGetGroup = async (params: DeviceGetGroupParams) => {
	try {
		const res = await deviceGetGroupService.getDeviceGroup(params);
		deviceList.value = Object.values(res.data["4"].children as object);
	} catch (error) {
		console.error(error);
	}
};

const handleGetStatus = async (params: DeviceGetStatusParams) => {
	try {
		const res = await deviceGetStatusService.getStatus(params);
		return res;
	} catch (error) {
		console.error(error);
	}
};

const handleSetStatus = async (params: DeviceSetStatusParams) => {
	try {
		const res = await deviceSetStatusService.setStatus(params);
		return res.success;
	} catch (error) {
		console.log(error);
	}
};

/* 合并可用的 type_name */
const combineTypeName = () => {
	deviceList.value = deviceList.value.map((device) => {
		const match = hardwareTypeList.value.find((hardware) => hardware.type_id === device.typeName);

		return {
			...device,
			name: match ? match.type_name : undefined,
		};
	});
};

/* 合并可用的 开关名称 */
const mergeDeviceStatus = (deviceStatusList: any) => {
	deviceList.value = deviceList.value.map((device) => {
		const deviceData = deviceStatusList[device.typeName]?.[device.id];

		if (!deviceData) return device;

		return {
			...device,
			states: deviceData.states || "offline",
			cloud_state: deviceData.data?.cloud_state
				? Object.keys(deviceData.data.cloud_state)
				: undefined,
		};
	});
};

/* 模态框 */
const showSwitchModal = (device: Device) => {
	selectedDevice.value = device;
	open.value = true;

	// 初始化开关状态
	if (device.cloud_state) {
		switchStates.value = device.cloud_state.reduce(
			(acc, key) => {
				// 保持原有状态
				acc[key] = (device as any)[key] ?? false;
				return acc;
			},
			{} as Record<string, boolean>,
		);
	}
};

/* 隐藏模态框 */
const hideSwitchModal = () => {
	open.value = false;
	selectedDevice.value = null;
};

/* 确认修改开关状态 */
const handleConfirm = async () => {
	if (!selectedDevice.value) {
		message.error("请选择设备！");
		return;
	}

	const device = selectedDevice.value;
	const states = switchStates.value;

	// 过滤掉没有任何可修改开关的设备
	if (!Object.keys(states).length) {
		message.error("当前设备无可修改的开关！");
		return;
	}

	// 构建请求参数
	let params: DeviceSetStatusParams = {};
	params[device.typeName] = {
		device_ids: [device.deviceId],
		data: Object.fromEntries(
			Object.entries(states).map(([key, value]) => [key, value ? "1" : "0"]),
		),
	};

	// 如果 params 里没有 data，则不发送请求
	if (!Object.keys(params[device.typeName].data).length) {
		message.error("未检测到需要修改的开关状态！");
		return;
	}

	const res = await handleSetStatus(params);

	if (res) {
		message.success("修改成功！");
	} else {
		message.error("修改失败！");
	}

	hideSwitchModal();
};

/* 生命周期 */
onMounted(async () => {
	await handleGetAllDevType({
		tag: null,
		current: 1,
		rowCount: 20,
	});

	// 构建 type_id 用于请求
	let typeParam: string[] = hardwareTypeList.value.map((item) => item.type_id);
	await handleGetGroup({
		app_id: null,
		type_names: typeParam,
	});

	combineTypeName();

	// 构建获取设备开关的请求，合并到 deviceList 中
	let getSwitchParam: DeviceGetStatusParams = {};
	deviceList.value.map((device) => {
		getSwitchParam[device.typeName] = {
			all: true,
			group_ids: [],
			device_ids: [],
		};
	});
	// 获取设备状态
	let deviceStatusList = await handleGetStatus(getSwitchParam);

	// 处理数据并合并到 deviceList
	mergeDeviceStatus(deviceStatusList);
});
</script>

<style scoped>
.ant-btn-default:not(:disabled) {
	color: black;
	border-color: black;
}

/* 深色模式下的样式 */
[data-bs-theme="dark"] .ant-btn-default:not(:disabled) {
	color: white;
	border-color: white;
}

.ant-btn-default:not(:disabled):hover {
	color: var(--color-main);
	border-color: var(--color-main);
}

:global([data-bs-theme="dark"] [aria-checked="false"] .ant-switch-inner) {
	background-color: #606060;
}

:global([data-bs-theme="dark"] .ant-modal-content) {
	background-color: #1e1e1e;
	color: white;
}

:global([data-bs-theme="dark"] .ant-modal-title) {
	background-color: #1e1e1e;
	color: white;
}
</style>
