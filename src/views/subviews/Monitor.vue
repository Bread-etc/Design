<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2 d-flex justify-content-between">
			数据监控
			<vxe-switch
				v-model="analysisMode"
				open-label="设备"
				close-label="硬件"
				style="transform: scale(1.2); transform-origin: center"
			></vxe-switch>
		</h4>

		<!-- 筛选框部分 -->
		<div class="d-flex flex-column my-3 p-1">
			<!-- 第一行：硬件类型、硬件ID、硬件名称 -->
			<div class="d-flex align-items-center gap-3" v-if="!analysisMode">
				<!-- 硬件类型 -->
				<select id="hardwareType" class="form-select" v-model="filter.hardwareTypeID">
					<option value="">请选择硬件类型</option>
					<option v-for="item in hardwareTypes" :key="item.id" :value="item.id">
						{{ item.name }}
					</option>
				</select>

				<!-- 硬件ID -->
				<select id="hardwareIDs" class="form-select" v-model="hardwareID">
					<!-- 将value设置为一个空数组，与filter.hardwareID的类型保持一致 -->
					<option value="">请选择硬件ID</option>
					<option v-for="item in hardwareIDs" :key="item.id" :value="item.name">
						{{ item.name }}
					</option>
				</select>

				<!-- 硬件名称 -->
				<input
					type="text"
					id="hardwareName"
					class="form-control flex-grow-1"
					v-model="hardwareName"
					placeholder="输入硬件名称"
				/>
			</div>

			<!-- 第一行：设备类型、设备ID、设备名称 -->
			<div class="d-flex align-items-center gap-3" v-if="analysisMode">
				<!-- 设备类型 -->
				<select id="deviceType" class="form-select" v-model="filterForDevice.deviceTypeID">
					<option value="">请选择设备类型</option>
					<option v-for="item in deviceTypes" :key="item.id" :value="item.id">
						{{ item.name }}
					</option>
				</select>

				<!-- 设备ID -->
				<select id="deviceID" class="form-select" v-model="deviceID">
					<option value="">请选择设备ID</option>
					<option v-for="item in deviceIDs" :key="item.id" :value="item.id">
						{{ item.name }}
					</option>
				</select>

				<!-- 设备名称 -->
				<input
					type="text"
					id="deviceName"
					class="form-control flex-grow-1"
					v-model="deviceName"
					placeholder="输入设备名称"
				/>
			</div>

			<!-- 第二行：时间选择 -->
			<div class="d-flex align-items-center gap-3 mt-3">
				<!-- 开始时间 -->
				<label class="text-nowrap pe-1">开始时间:</label>
				<input type="datetime-local" id="timeStart" class="form-control" v-model="timeStart" />

				<!-- 结束时间 -->
				<label class="text-nowrap pe-1">结束时间:</label>
				<input type="datetime-local" id="timeEnd" class="form-control" v-model="timeEnd" />

				<div class="d-flex align-items-center">
					<button
						type="submit"
						class="btn btn-primary fw-bold border-0 text-nowrap px-3"
						style="background-color: var(--color-main)"
						@click="handleSearch()"
					>
						搜索
					</button>
				</div>
			</div>
		</div>

		<div class="dataCard p-4 rounded-4" v-show="!analysisMode">
			<div class="d-flex justify-content-between align-items-center w-100 pb-2">
				<h5 class="fw-bold">硬件数据</h5>
				<p class="text-muted">总计 {{ hardwareData.length }}</p>
			</div>

			<vxe-table border height="350" :data="hardwareData">
				<vxe-column field="dataID" title="ID" width="50" align="center"></vxe-column>
				<vxe-column field="hardwareTypeID" title="硬件类型"></vxe-column>
				<vxe-column field="hardwareID" title="硬件 ID"></vxe-column>
				<vxe-column field="time" title="时间" width="200"></vxe-column>

				<vxe-column field="state" title="硬件状态" width="150" align="center" size="medium">
					<template #default="{ row }">
						<vxe-button mode="text" @click="openStateDetailForHardware(row)">
							点击查看详情
						</vxe-button>
					</template>
				</vxe-column>
			</vxe-table>
		</div>

		<div class="dataCard p-4 rounded-4" v-show="analysisMode">
			<div class="d-flex justify-content-between align-items-center w-100 pb-2">
				<h5 class="fw-bold">设备数据</h5>
				<p class="text-muted">总计 {{ deviceData.length }}</p>
			</div>

			<vxe-table border height="350" :data="deviceData">
				<vxe-column field="dataID" title="ID" width="50" align="center"></vxe-column>
				<vxe-column field="deviceTypeID" title="设备类型"></vxe-column>
				<vxe-column field="deviceID" title="设备 ID"></vxe-column>
				<vxe-column field="time" title="时间" width="200"></vxe-column>

				<vxe-column field="state" title="设备状态" width="150" align="center" size="medium">
					<template #default="{ row }">
						<vxe-button mode="text" @click="openStateDetailForDevice(row)">
							点击查看详情
						</vxe-button>
					</template>
				</vxe-column>
			</vxe-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
/* 此处为数据监控面板，主要展示硬件数据列表、设备数据、加工任务、设备加工、空间加工数据列表 */
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user.store";
import type { RawDataHardwareListParams } from "@/api/interface/monitor/RawDataHardwareList";
import rawDataHardwareListService from "@/api/service/monitor/rawDataHardwareListService";
import { VxeUI } from "vxe-pc-ui";
import type { RawDataDeviceListParams } from "@/api/interface/monitor/RawDataDeviceList";
import rawDataDeviceListService from "@/api/service/monitor/rawDataDeviceListService";
import { useHardwareAndDeviceOptions } from "@/utils/fetchOptions";

/* 定义类型 */
interface StatePower {
	POWERS_1: string;
	VOLTAGE_1: number;
}

interface StateValue {
	stateID: string;
	value: number;
}

interface RowOne {
	dataID: number;
	hardwareTypeID: string;
	hardwareID: string;
	time: string;
	state: StatePower | StateValue[];
}

interface RowTwo {
	dataID: number;
	deviceTypeID: string;
	deviceID: string;
	time: string;
	state: StateValue[];
}

const analysisMode = ref(false);
const accessToken = useUserStore().token;
const hardwareID = ref<string>("");
const hardwareName = ref<string>("");
const deviceID = ref<string>("");
const deviceName = ref<string>("");
const timeStart = ref<string>("");
const timeEnd = ref<string>("");
const filter = computed(() => ({
	hardwareTypeID: "",
	hardwareIDs: [hardwareID.value], // 变成 computed 后，每次 hardwareID.value 变化都会更新
	hardwareNames: [hardwareName.value], // 同理
	spaceIDs: [],
	spaceNames: [""],
	spaceRecursive: true,
	timeStart: timeStart.value,
	timeEnd: timeEnd.value,
}));
const filterForDevice = computed(() => ({
	deviceTypeID: "",
	deviceIDs: [deviceID.value],
	deviceNames: [deviceName.value],
	spaceIDs: [],
	spaceNames: [""],
	spaceRecursive: true,
	timeStart: timeStart.value,
	timeEnd: timeEnd.value,
}));
const hardwareData = ref<RowOne[]>([]);
const deviceData = ref<RowTwo[]>([]);
const {
	hardwareTypes,
	hardwareIDs,
	deviceTypes,
	deviceIDs,
	fetchHardwareOptions,
	fetchDeviceOptions,
} = useHardwareAndDeviceOptions();

/* 表格详细信息展示 */
const openStateDetailForHardware = (row: RowOne) => {
	let content = "";

	if (Array.isArray(row.state)) {
		// 如果 `state` 是数组（StateValue[]）
		content = row.state.map((s) => `硬件状态 ID: ${s.stateID}, 状态值: ${s.value}`).join("\n");
	} else if ("POWERS_1" in row.state && "VOLTAGE_1" in row.state) {
		// 如果 `state` 是对象（StatePower）
		content = `功率: ${row.state.POWERS_1}, 电压: ${row.state.VOLTAGE_1}`;
	} else {
		content = "未知的状态类型";
	}

	VxeUI.modal.open({
		title: "状态详情",
		content: content || "无硬件状态",
	});
};

const openStateDetailForDevice = (row: RowTwo) => {
	let content = "";

	if (Array.isArray(row.state)) {
		content = row.state.map((s) => `设备状态 ID: ${s.stateID}，状态值: ${s.value}`).join("\n");
	} else {
		content = "未知的状态类型";
	}

	VxeUI.modal.open({
		title: "状态详情",
		content: content || "无设备状态",
	});
};

/* 搜索事件 */
const handleSearch = () => {
	if (!analysisMode.value) {
		let params: RawDataHardwareListParams = {
			accessToken: accessToken as string,
			filter: filter.value,
			positioning: {
				maxID: null,
				sinceID: null,
				count: null,
			},
		};
		handleHardwareList(params);
	} else {
		let params: RawDataDeviceListParams = {
			accessToken: accessToken as string,
			filter: filterForDevice.value,
			positioning: {
				maxID: null,
				sinceID: null,
				count: null,
			},
		};
		handleDeviceList(params);
	}
};

/* 网络请求事件 */
const handleHardwareList = async (params: RawDataHardwareListParams) => {
	try {
		const res = await rawDataHardwareListService.rawDataHardwareList(params);

		if (res.data.results) {
			// 处理返回的数据，格式化为表格所需格式
			hardwareData.value = res.data.results.map((item: any) => ({
				dataID: item.dataID,
				hardwareTypeID: item.hardwareTypeID,
				hardwareID: item.hardwareID,
				time: item.time,
				state: item.states,
			}));
		}
	} catch (error) {
		console.error(error);
	}
};

const handleDeviceList = async (params: RawDataDeviceListParams) => {
	try {
		const res = await rawDataDeviceListService.rawDataDeviceList(params);

		if (res.data.results) {
			// 处理返回的数据，格式化为表格所需格式
			deviceData.value = res.data.results.map((item: any) => ({
				dataID: item.dataID,
				deviceTypeID: item.deviceTypeID,
				deviceID: item.deviceID,
				time: item.time,
				state: item.states,
			}));
		}
	} catch (error) {
		console.error(error);
	}
};

/* 初始化网络请求事件 */
onMounted(() => {
	handleHardwareList({
		accessToken: accessToken!,
		filter: {
			hardwareTypeID: "",
			hardwareIDs: [""],
			hardwareNames: [""],
			spaceIDs: [],
			spaceNames: [""],
			spaceRecursive: true,
			timeStart: "",
			timeEnd: "",
		},
		positioning: {
			maxID: 1,
			sinceID: 1,
			count: 1,
		},
	});

	handleDeviceList({
		accessToken: accessToken!,
		filter: {
			deviceTypeID: "",
			deviceIDs: [""],
			deviceNames: [""],
			spaceIDs: [],
			spaceNames: [""],
			spaceRecursive: true,
			timeStart: "",
			timeEnd: "",
		},
		positioning: {
			maxID: 1,
			sinceID: 1,
			count: 1,
		},
	});

	fetchHardwareOptions(accessToken!);
	fetchDeviceOptions(accessToken!);
});
</script>

<style scoped>
.dataCard {
	background-color: var(--bg-card);
	border: solid 2px transparent;
	transition:
		box-shadow 0.3s ease,
		border 0.3s ease;
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

/* 深色模式下的样式 */
[data-bs-theme="dark"] .dataCard:hover {
	box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2); /* 白色阴影，适用于深色模式 */
}

.vxe-button.type--text:not(.is--disabled):hover {
	color: var(--color-main) !important;
}
</style>
