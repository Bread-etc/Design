<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">设备列表</h4>
	</div>
</template>

<script lang="ts" setup>
import type { DeviceTypeListParams } from "@/api/interface/DeviceTypeList";
import deviceTypeService from "@/api/service/deviceTypeService";
import { useUserStore } from "@/stores/user.store";
import { onMounted } from "vue";

const accessToken = useUserStore().token;
const handleDeviceTypeList = async (params: DeviceTypeListParams) => {
	try {
		const res = await deviceTypeService.deviceTypeList(params);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
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

<style scoped></style>
