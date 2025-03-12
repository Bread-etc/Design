<template>
	<div class="p-2 w-100 d-flex flex-column" style="height: 100vh">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">实训应用</h4>
		<div class="d-flex align-items-center h-75">
			<div class="d-flex flex-column gap-3 p-2 w-25">
				<!-- 遍历固定的 5 个开关 -->
				<div
					v-for="item in switches"
					:key="item.name"
					class="d-flex justify-content-between align-items-center gap-2 h-100"
				>
					<span>{{ item.label }}</span>
					<a-switch v-model:checked="item.checked" />
				</div>
				<!-- 确定按钮 -->
				<div class="d-flex justify-content-center">
					<a-button type="primary" class="mt-3 w-25" @click="submitSwitches">确定</a-button>
				</div>
			</div>

			<!-- 中央图片区域 -->
			<div class="d-flex">
				<img src="@/assets/images/LoRaPlug.png" alt="设备图像" />
			</div>

			<!-- 右侧信息区域 -->
			<div class="d-flex flex-column border rounded p-3 flex-grow-1">
				<h5 class="fw-bold mb-2" style="color: var(--color-main)">产品信息</h5>
				<div class="border-bottom pb-2 mb-2">
					<p class="mb-1"><strong>型号：</strong>SPS-105A-L / SSO-101A-L / SSO-161A-L</p>
					<p class="mb-1"><strong>厂商：</strong>信锐</p>
					<p class="mb-1"><strong>接入方式：</strong>LoRa</p>
					<p class="mb-0"><strong>供电方式：</strong>AC220V</p>
				</div>
				<h6 class="fw-bold text-secondary">产品特性</h6>
				<ul class="mb-0 ps-3">
					<li>支持定时通断电、实时功率监控、电量计量、大功率告警</li>
					<li>
						SPS-105A-L / SSO-101A-L 支持最大负载电流 <strong>10A</strong>，负载功率
						<strong>2200W</strong>
					</li>
					<li>SSO-161A-L 支持最大负载电流 <strong>16A</strong>，负载功率 <strong>4000W</strong></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { DeviceGetStatusInner } from "@/api/interface/device/DeviceGetStatus";
import deviceGetStatusService from "@/api/service/device/deviceGetStatusService";
import deviceSetStatusService from "@/api/service/device/deviceSetStatusService";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

const deviceStatus = ref<DeviceGetStatusInner>();

const switches = ref([
	{ name: "DEV_BEEP_STA", label: "蜂鸣器", checked: false },
	{ name: "DEV_LED_STA", label: "LED 指示灯", checked: false },
	{ name: "DEV_PLATFORM_REJ", label: "拒绝平台通断", checked: false },
	{ name: "DEV_POLICY_REJ", label: "拒绝策略通断", checked: false },
	{ name: "DEV_SWITCH_STA", label: "电源开关", checked: false },
]);

/* 网络请求 */
const fetchGetStatus = async () => {
	try {
		const res = await deviceGetStatusService.getStatus({
			LoraPlug: {
				all: true,
				group_ids: [],
				device_ids: [],
			},
		});

		// 获取设备数据
		deviceStatus.value = res["LoraPlug"]["GHK8270146"];

		// 确保 sync_state 存在
		if (deviceStatus.value?.data?.sync_state) {
			switches.value.forEach((item) => {
				const syncState = deviceStatus.value?.data?.sync_state as unknown as Record<string, string>;
				item.checked = syncState[item.name] === "1.00";
			});
		}
	} catch (error) {
		console.error(error);
	}
};

/* 提交开关状态 */
const submitSwitches = async () => {
	const updateData = switches.value.reduce(
		(acc, item) => {
			acc[item.name] = item.checked ? "1" : "0";
			return acc;
		},
		{} as Record<string, string>,
	);

	try {
		await deviceSetStatusService.setStatus({
			LoRaPlug: {
				device_ids: ["GHK8270146"],
				data: updateData,
			},
		});

		message.success("提交成功");
		await fetchGetStatus();
	} catch (error) {
		message.error("提交失败");
	}
};

/* 生命周期 */
onMounted(async () => {
	await fetchGetStatus();
});
</script>

<style scoped>
:global([data-bs-theme="dark"] [aria-checked="false"] .ant-switch-inner) {
	background-color: #606060;
}
</style>
