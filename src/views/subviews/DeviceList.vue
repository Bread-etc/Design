<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2" style="height: 10%">设备列表</h4>
		<div class="d-flex pt-2" style="height: 90%">
			<!-- 左侧 设备类型树 -->
			<div class="dataCard rounded-3 p-2 me-3" style="width: 20%">
				<p
					class="d-flex align-items-center text-muted px-3 py-2 border-bottom border-2 mb-2 fw-bold"
				>
					可选设备
					<i class="ms-auto" style="font-style: normal">{{ treeData.length }}</i>
				</p>
				<a-tree class="px-2 py-1" :tree-data="treeData" :block-node="true" @select="handleSelect" />
			</div>

			<!-- 右侧 设备表格 -->
			<div class="dataCard rounded-3 p-2" style="width: 80%">
				<div class="d-flex justify-content-between align-items-center p-2">
					<span class="fw-bold">设备详情</span>
					<div>
						<span class="text-muted me-5" style="font-size: 0.8rem"
							>软件版本: {{ selectedItem[0]?.softVer || "$version" }}</span
						>
						<span class="text-muted" style="font-size: 0.8rem"
							>在线时间: {{ selectedItem[0]?.onlineTime || "$time" }}</span
						>
					</div>
				</div>

				<!-- 复选框：用于动态控制表格列 -->
				<a-checkbox-group
					v-model:value="selectedColumns"
					v-if="dataFields.length"
					class="p-2 gap-3 w-100"
				>
					<a-checkbox
						v-for="field in dataFields"
						:key="field"
						:value="field"
						style="color: var(--text-color-nav-hover)"
					>
						{{ field }}
					</a-checkbox>
				</a-checkbox-group>

				<a-table
					:ellipsis="true"
					:scroll="{ x: 1000 }"
					bordered
					:columns="filteredColumns"
					:data-source="selectedItem"
					:pagination="false"
					row-key="name"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { DeviceGetAllDevTypeParams } from "@/api/interface/device/DeviceGetAllDevType";
import type { DeviceGetAllVirDevTypeParams } from "@/api/interface/device/DeviceGetAllVirDevType";
import type {
	DeviceGetStatusInner,
	DeviceGetStatusParams,
	DeviceGetStatusResult,
} from "@/api/interface/device/DeviceGetStatus";
import deviceGetAllDevTypeService from "@/api/service/device/deviceGetAllDevTypeService";
import deviceGetAllVirDevTypeService from "@/api/service/device/deviceGetAllVirDevTypeService";
import deviceGetStatusService from "@/api/service/device/deviceGetStatusService";
import type { TableColumnsType } from "ant-design-vue";
import { computed, onMounted, ref, toRaw, type Ref } from "vue";

/*
	1、获取全部硬件、设备，保存到 hardwareTypeList 和 deviceTypeList
		{ type_id, type_name, model }
		[无法看出是否能用、有无数据]
		对应 3.1.5 / 3.1.6
	2、通过 getDevType 得到的 type_id 来填入 getStatus 来进行查询
		去掉为 {} 的对象，保存有数值的对象
	3、通过 getDevVirType 得到的 type_id 来填入 getStatus 来进行查询
		去掉为 {} 的对象，保存有数值的对象
	4、将[2]、[3]步的对象一一对应，[3]中的 name 用于左侧展示，[2]中的数值用于表格展示
*/

/* 变量 */
const hardwareTypeList = ref<{ type_id: string; type_name: string; model: string }[]>([]);
const deviceTypeList = ref<{ type_id: string; type_name: string; model: string }[]>([]);
const hardwareInfo = ref<{ [key: string]: DeviceGetStatusInner }[]>([]);
const deviceInfo = ref<{ [key: string]: DeviceGetStatusInner }[]>([]);
const selectedItem = ref<any[]>([]);
const selectedColumns = ref<string[]>([]);
const fixedColumns: TableColumnsType = [
	{ title: "设备名称", width: 100, dataIndex: "name", key: "name", fixed: "left" },
	{ title: "属性", width: 100, dataIndex: "states", key: "states" },
];
/* 计算树形图 */
const treeData = computed(() => {
	return deviceInfo.value.flatMap((obj) =>
		Object.entries(obj).map(([key, value]) => ({
			title: Object.values(value)[7], // 获取第一个设备的 name
			key: key, // 设备类型 ID（最外层 key）
		})),
	);
});
/* 计算 data、cloud_state 和 sync_state */
const dataFields = computed(() => {
	if (!selectedItem.value.length) return [];
	const item = selectedItem.value[0];
	// data 字段
	const dataKeys = Object.keys(item.data || {});
	// cloud_state(平台值)
	const cloud_state_keys = item.data?.cloud_state ? Object.keys(item.data.cloud_state) : [];
	const cloudKeys = cloud_state_keys.length ? cloud_state_keys.map((key) => `cloud: ${key}`) : [];
	// sync_state(待同步值)
	const sync_state_keys = item.data?.sync_state ? Object.keys(item.data.sync_state) : [];
	const syncKeys = sync_state_keys.length ? sync_state_keys.map((key) => `sync: ${key}`) : [];

	return [...dataKeys, ...cloudKeys, ...syncKeys];
});
/* 计算动态列, 空白列给予 “ - ” */
const filteredColumns = computed(() => {
	const getCellValue = (text: string) => (text !== "" && text !== undefined ? text : "-");
	const dynamicColumns = selectedColumns.value.map((field) => {
		if (field.startsWith("cloud: ")) {
			const key = field.replace("cloud: ", "");
			return {
				title: field,
				dataIndex: ["data", "cloud_state", key],
				key,
				width: 120,
				customRender: ({ text }: any) => getCellValue(text),
			};
		} else if (field.startsWith("sync: ")) {
			const key = field.replace("sync: ", "");
			return {
				title: field,
				dataIndex: ["data", "sync_state", key],
				key,
				width: 120,
				customRender: ({ text }: any) => getCellValue(text),
			};
		} else {
			return {
				title: field,
				dataIndex: ["data", field],
				key: field,
				width: 120,
				customRender: ({ text }: any) => getCellValue(text),
			};
		}
	});

	return [...fixedColumns, ...dynamicColumns];
});

/* 网络请求 */
const fetchGetAllDevType = async (params: DeviceGetAllDevTypeParams) => {
	try {
		const res = await deviceGetAllDevTypeService.getAllDevType(params);
		hardwareTypeList.value = res.data;
	} catch (error) {
		console.error(error);
	}
};

const fetchGetAllVirDevType = async (params: DeviceGetAllVirDevTypeParams) => {
	try {
		const res = await deviceGetAllVirDevTypeService.getAllVirDevType(params);
		deviceTypeList.value = res.data;
	} catch (error) {
		console.error(error);
	}
};

const fetchGetStatus = async (params: DeviceGetStatusParams) => {
	try {
		const res = await deviceGetStatusService.getStatus(params);
		return res;
	} catch (error) {
		console.error(error);
	}
};

/* 处理请求体 */
const constructReq = (list: Ref<{ type_id: string; type_name: string; model: string }[]>) => {
	let req: DeviceGetStatusParams = {};
	list.value.forEach((item) => {
		req[item.type_id] = {
			all: true,
			group_ids: [],
			device_ids: [],
		};
	});

	return req;
};

/* 去除多余空对象 */
const filterEmptyObject = (res: DeviceGetStatusResult) => {
	let newRes: { [key: string]: DeviceGetStatusInner }[] = [];

	for (const key in res) {
		if (key !== "success" && Object.keys(res[key]).length !== 0) {
			newRes.push(res[key]);
		}
	}

	return newRes;
};

/* 树节点选择 */
const handleSelect = (selectedKeys: string[]) => {
	const selectedKey = selectedKeys[0];

	// 获取原始数据
	const selectedData = deviceInfo.value.flatMap(
		(obj) =>
			Object.entries(obj)
				.filter(([key]) => key === selectedKey)
				.map(([_, value]) => toRaw(value)), // 确保 Proxy 被解析
	);

	selectedItem.value = selectedData;
	selectedColumns.value = dataFields.value;
};

/* 生命周期 */
onMounted(async () => {
	await fetchGetAllDevType({
		tag: null,
		current: 1,
		rowCount: 20,
	});
	await fetchGetAllVirDevType({
		appName: null,
		current: 1,
		rowCount: 20,
	});
	// 再根据上面的内容获取硬件/设备状态
	let H = await fetchGetStatus(constructReq(hardwareTypeList));
	let D = await fetchGetStatus(constructReq(deviceTypeList));
	if (H && D) {
		hardwareInfo.value = filterEmptyObject(H);
		deviceInfo.value = filterEmptyObject(D);
	}
});
</script>

<style scoped>
.dataCard {
	background-color: var(--bg-card);
	border: solid 2px transparent;
	transition:
		box-shadow 0.3s ease,
		border 0.3s ease;
	overflow: hidden;
}

/* 鼠标悬停时 */
.dataCard:hover {
	border-color: var(--color-main);
	cursor: pointer;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 默认黑色阴影，适用于浅色模式 */
	transition:
		border 0.7s ease,
		box-shadow 0.3s ease;
}

/* 树形图 */
:deep(.ant-tree-switcher, .ant-tree-switcher-noop) {
	display: none;
}

:deep(.ant-tree-node-content-wrapper) {
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
	padding-left: 0.7rem;
	padding-right: 0.7rem;
}

:deep([role="tree"]) {
	background-color: var(--bg-card);
	color: var(--text-color-nav-hover);
}

.dataCard:deep(.ant-tree-node-selected) {
	background-color: var(--color-main);
}

/* 表格 */
:global([data-bs-theme="dark"] .ant-table-cell) {
	background-color: #2c2c2c !important;
	border-color: white;
	color: white !important;
}

:global([data-bs-theme="dark"] .ant-empty-description) {
	color: white !important;
}

/* 深色模式下的样式 */
[data-bs-theme="dark"] .dataCard:hover {
	box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2); /* 白色阴影，适用于深色模式 */
}
</style>
