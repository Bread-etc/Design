<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">设备列表</h4>
	</div>
</template>

<script lang="ts" setup>
import type { GetDeviceTypeParams } from "@/api/interface/DeviceTypeList";
import getDeviceTypeService from "@/api/service/deviceTypeService";
import { useUserStore } from "@/stores/user.store";
import { onMounted } from "vue";

const accessToken = useUserStore().token;
const handleDeviceTypeList = async (params: GetDeviceTypeParams) => {
	try {
		const res = await getDeviceTypeService.getDeviceTypeList(params);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	handleDeviceTypeList({
		accessToken: accessToken!,
		filter: {
			deviceTypeIDs: [],
			deviceTypeNames: [],
			deviceClassification: [],
		},
	});
});
</script>

<style scoped></style>
