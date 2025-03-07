<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">设备列表</h4>

		<div class="dataCard p-4 rounded-4">
			<div class="d-flex justify-content-between align-items-center w-100 pb-2">
				<!-- <h5 class="fw-bold">设备列表</h5> -->
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
import type { DeviceTypeListParams } from "@/api/interface/DeviceTypeList";
import deviceTypeService from "@/api/service/deviceTypeService";
import { useUserStore } from "@/stores/user.store";
import { onMounted, ref } from "vue";
import { VxeUI } from "vxe-pc-ui";

const accessToken = useUserStore().token;
const handleDeviceTypeList = async (params: DeviceTypeListParams) => {
	try {
		const res = await deviceTypeService.deviceTypeList(params);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};
const deviceData = ref([]);

const openStateDetailForDevice = (row: any) => {
	let content = "";

	if (Array.isArray(row.state)) {
		content = row.state.map((s: any) => `设备状态 ID: ${s.stateID}，状态值: ${s.value}`).join("\n");
	} else {
		content = "未知的状态类型";
	}

	VxeUI.modal.open({
		title: "状态详情",
		content: content || "无设备状态",
	});
};

onMounted(() => {
	handleDeviceTypeList({
		accessToken: accessToken!,
		fields: ["info", "states"],
		filter: {
			all: true,
			deviceTypeIDs: [""],
			deviceTypeNames: [""],
			deviceClassification: [""],
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

.vxe-button.type--text:not(.is--disabled):hover {
	color: var(--color-main) !important;
}
</style>
