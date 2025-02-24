<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">数据监控</h4>

		<!-- 筛选框部分 -->
		<div class="d-flex flex-column my-3 p-1">
			<!-- 第一行：硬件类型、硬件ID、硬件名称 -->
			<div class="d-flex align-items-center gap-3">
				<!-- 硬件类型 -->
				<select id="hardwareType" class="form-select" v-model="filter.hardwareTypeID">
					<option value="">请选择硬件类型</option>
					<option value="type1">硬件类型1</option>
					<option value="type2">硬件类型2</option>
				</select>

				<!-- 硬件ID -->
				<select id="hardwareID" class="form-select" v-model="filter.hardwareID">
					<!-- 将value设置为一个空数组，与filter.hardwareID的类型保持一致 -->
					<option :value="['']">请选择硬件ID</option>
					<option value="['GAK']">GAK</option>
					<option value="['GBK0000001']">GBK0000001</option>
				</select>

				<!-- 硬件名称 -->
				<input
					type="text"
					id="hardwareName"
					class="form-control flex-grow-1"
					v-model="filter.hardwareNames"
					placeholder="输入硬件名称"
				/>
			</div>

			<!-- 第二行：时间选择 -->
			<div class="d-flex align-items-center gap-3 mt-3">
				<!-- 开始时间 -->
				<label class="text-nowrap pe-1">开始时间:</label>
				<input
					type="datetime-local"
					id="timeStart"
					class="form-control"
					v-model="filter.timeStart"
				/>

				<!-- 结束时间 -->
				<label class="text-nowrap pe-1">结束时间:</label>
				<input type="datetime-local" id="timeEnd" class="form-control" v-model="filter.timeEnd" />
			</div>
		</div>

		<div class="dataCard p-4 rounded-4">
			<div class="d-flex justify-content-between align-items-center w-100 pb-2">
				<h5 class="fw-bold">硬件数据</h5>
				<p class="text-muted">117 total</p>
			</div>

			<vxe-table
				border="full"
				round
				height="200"
				:data="hardwareData"
				empty-text="没有更多数据了！"
			>
				<vxe-column field="dataID" title="Id" width="60"></vxe-column>
				<vxe-column field="hardwareTypeID" title="硬件类型"></vxe-column>
				<vxe-column field="hardwareID" title="硬件Id"></vxe-column>
				<vxe-column field="time" title="时间"></vxe-column>
				<vxe-column field="state" title="硬件状态"></vxe-column>
			</vxe-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
/* 此处为数据监控面板，主要展示硬件数据列表、设备数据、加工任务、设备加工、空间加工数据列表 */
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user.store";
import type { RawDataHardwareListParams } from "@/api/interface/monitor/RawDataHardwareList";
import rawDataHardwareListService from "@/api/service/monitor/rawDataHardwareListService";

interface rowOne {
	dataID: number;
	hardwareTypeID: string;
	hardwareID: string;
	time: string;
	state: object[];
}

const accessToken = useUserStore().token;
const filter = ref({
	hardwareTypeID: "",
	hardwareID: [""],
	hardwareNames: [""],
	spaceIDs: [],
	spaceNames: [""],
	timeStart: "",
	timeEnd: "",
	spaceRecursive: true,
});
const hardwareData = ref<rowOne[]>([]);
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
				state: item.states?.stateID || "N/A", // 如果没有stateID，显示 "N/A"
			}));
		}
	} catch (error) {
		console.error(error);
	}
};

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
</style>
