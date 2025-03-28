<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2" style="height: 10%">数据监控</h4>

		<div class="d-flex flex-wrap justify-content-around" style="height: 90%">
			<div class="chartCard rounded-3">
				<div
					ref="chartDomOne"
					class="w-100 h-100 d-flex justify-content-center align-items-center"
				></div>
			</div>
			<div class="chartCard rounded-3 d-flex flex-column p-3 w-100">
				<a-divider class="m-0" style="border-color: var(--color-main)">告警列表</a-divider>
				<div style="max-height: 20%" v-if="alarmList?.rows?.length">
					<div
						v-for="item in alarmList.rows"
						class="d-flex justify-content-between align-items-center p-2"
						style="font-size: 14px"
					>
						<div class="text-nowrap overflow-hidden text-ellipsis fw-bold">
							{{ item.policyName }}
						</div>
						<div class="text-nowrap overflow-hidden text-ellipsis" style="color: var(--color-main)">
							{{ item.rankName }}
						</div>
						<div class="col-8 d-inline-block overflow-x-auto white-space-nowrap">
							{{ item.alarmContent }}
						</div>
					</div>
				</div>
				<div v-else class="text-muted d-flex justify-content-center align-items-center h-100">
					暂无告警数据
				</div>
			</div>
			<div class="chartCard rounded-3 d-flex justify-content-center align-items-center">
				<div
					ref="chartDomTwo"
					class="w-100 h-100 d-flex justify-content-center align-items-center"
				></div>
			</div>
			<div class="chartCard rounded-3 d-flex flex-column p-3">
				<a-divider class="m-0" style="border-color: var(--color-main)">巡检列表</a-divider>
				<div style="max-height: 20%" v-if="pollingList.length">
					<div
						v-for="poll in pollingList"
						class="d-flex justify-content-between align-items-center p-2"
					>
						<div class="fw-bold">{{ poll.name }}</div>
						<div>{{ poll.description }}</div>
					</div>
				</div>
				<div v-else class="text-muted d-flex justify-content-center align-items-center h-100">
					暂无巡检任务
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type {
	DeviceGetStatusInner,
	DeviceGetStatusParams,
	DeviceGetStatusResult,
} from "@/api/interface/device/DeviceGetStatus";
import type { MonitorGetAlarmLogListResult } from "@/api/interface/monitor/MonitorGetAlarmLogList";
import deviceGetAllVirDevTypeService from "@/api/service/device/deviceGetAllVirDevTypeService";
import deviceGetStatusService from "@/api/service/device/deviceGetStatusService";
import monitorGetAlarmLogListService from "@/api/service/monitor/monitorGetAlarmLogListService";
import monitorGetPollingPolicyService from "@/api/service/monitor/monitorGetPollingPolicyService";
import { ref, onMounted, type Ref, nextTick } from "vue";
import * as echarts from "echarts";

/* 变量 */

// 巡检策略列表
const pollingList = ref<{ description: string; id: number; name: string }[]>([]);
// 告警列表
const alarmList = ref<MonitorGetAlarmLogListResult["data"]>();
// 设备类型列表
const deviceTypeList = ref<{ type_id: string; type_name: string; model: string }[]>([]);
// 设备信息列表
const deviceInfo = ref<{ [key: string]: DeviceGetStatusInner }[]>([]);
// 深色模式
const isDarkMode = localStorage.getItem("theme") === "dark" ? true : false;

/* echart 图表 */
const chartDomOne = ref<HTMLElement | null>(null);
const chartDomTwo = ref<HTMLElement | null>(null);

/* 网络请求事件 */
const fetchGetPollingPolicy = async () => {
	try {
		const res = await monitorGetPollingPolicyService.getPollingPolicy({
			appId: 4,
			isSpace: false,
		});
		pollingList.value = res.data;
	} catch (err) {
		console.error(err);
	}
};

const fetchGetAlarmLogList = async () => {
	try {
		const res = await monitorGetAlarmLogListService.getAlarmLogList({
			appId: 4,
			alarmRanks: ["1", "2", "3", "4"],
			dealMethod: "UnRead",
			timeStart: "2025-03-01 00:00:00",
			timeEnd: "2025-06-01 20:00:00",
			current: 1,
			rowCount: 20,
		});
		alarmList.value = res.data;
	} catch (err) {
		console.error(err);
	}
};

const fetchGetAllVirDevType = async () => {
	try {
		const res = await deviceGetAllVirDevTypeService.getAllVirDevType({
			appName: null,
			current: 1,
			rowCount: 20,
		});
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

/* 生命周期 */
onMounted(async () => {
	await fetchGetPollingPolicy();
	await fetchGetAlarmLogList();
	await fetchGetAllVirDevType();

	// 获取设备状态
	let D = await fetchGetStatus(constructReq(deviceTypeList));
	if (D) {
		deviceInfo.value = filterEmptyObject(D);
	}

	// 确保 DOM 渲染完成后再初始化 ECharts
	await nextTick();

	if (chartDomOne.value) {
		// 计算可用与不可用设备数量
		let availableCount = deviceInfo.value.length;
		let unavailableCount = deviceTypeList.value.length - availableCount;
		const chartInstance = echarts.init(chartDomOne.value);

		const option = {
			tooltip: {
				trigger: "item",
			},
			legend: {
				top: "5%",
				left: "center",
				textStyle: {
					color: isDarkMode ? "#fff" : "#000",
				},
			},
			series: [
				{
					name: "设备状态",
					type: "pie",
					radius: ["40%", "70%"],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: "center",
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 16,
							fontWeight: "bold",
							color: isDarkMode ? "#fff" : "#000",
						},
					},
					data: [
						{ value: availableCount, name: "可用设备", itemStyle: { color: "#4CAF50" } },
						{ value: unavailableCount, name: "不可用设备", itemStyle: { color: "#F44336" } },
					],
				},
			],
		};

		chartInstance.setOption(option);
	}

	if (chartDomTwo.value) {
		const chartInstance = echarts.init(chartDomTwo.value);

		let statusData: DeviceGetStatusInner[] = [];
		deviceInfo.value.forEach((device) => {
			statusData.push(Object.values(device)[0]);
		});
		let data = statusData.map((item) => ({
			name: item.name,
			value: 1,
			state: item.states,
			time: item.onlineTime,
		}));

		const option = {
			tooltip: {
				trigger: "item",
				formatter: (params: any) => {
					let status = "";
					if (params.data.state === "online") {
						status = "在线";
					} else if (params.data.state === "offline") {
						status = "离线";
					} else {
						status = "异常";
					}
					return `设备名称: ${params.data.name}<br/>状态: ${status}<br/>最后在线: ${params.data.time}`;
				},
			},
			legend: {
				top: "5%",
				left: "center",
				textStyle: { color: isDarkMode ? "#fff" : "#000" },
			},
			series: [
				{
					name: "设备状态",
					type: "pie",
					radius: "70%",
					label: {
						show: true,
						position: "outside",
						color: isDarkMode ? "#fff" : "#000",
					},
					data: data,
				},
			],
		};

		chartInstance.setOption(option);
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

/* 图表样式 */
.chartCard {
	flex: 0 0 calc(50% - 1rem);
	height: calc(50% - 1rem);
	min-height: 200px;
	background-color: var(--bg-card);
	color: var(--text-color-main);
	border: solid 2px transparent;
	transition:
		box-shadow 0.3s ease,
		border 0.3s ease;
	overflow: hidden;
}

/* 鼠标悬停时 */
.chartCard:hover {
	border-color: var(--color-main);
	cursor: pointer;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 默认黑色阴影，适用于浅色模式 */
	transition:
		border 0.7s ease,
		box-shadow 0.3s ease;
}

:deep(.ant-divider-inner-text) {
	color: var(--text-color-main) !important;
}
</style>
