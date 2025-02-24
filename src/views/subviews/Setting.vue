<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">设置</h4>
		<p style="font-size: 1.1rem">选择主题</p>
		<div class="d-flex gap-2">
			<div
				@click="selectTheme('light')"
				class="theme-option"
				:class="{ selected: theme === 'light' }"
			>
				<div class="preview light-preview"></div>
				<div class="mt-1" style="font-size: 14px">浅色模式</div>
			</div>

			<!-- 深色模式 -->
			<div
				@click="selectTheme('dark')"
				class="theme-option"
				:class="{ selected: theme === 'dark' }"
			>
				<div class="preview dark-preview"></div>
				<div class="mt-1" style="font-size: 14px">深色模式</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { VxeUI, type VxeGlobalThemeName } from "vxe-pc-ui";

// 当前选择的主题，默认为 "light"
const theme = ref("light");

// 选择主题方法
const selectTheme = (mode: string) => {
	theme.value = mode;
	localStorage.setItem("theme", mode); // 保存用户设置
	document.body.setAttribute("data-bs-theme", mode); // 设置主题
	VxeUI.setTheme(theme.value as VxeGlobalThemeName); // 设置表格主题
};

// 初始化所选择主题
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
	theme.value = savedTheme;
	VxeUI.setTheme(theme.value as VxeGlobalThemeName);
}
</script>

<style scoped lang="css">
/* 单个主题选项 */
.theme-option {
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	border: 2px solid transparent;
	border-radius: 8px;
	padding: 8px;
	transition: border-color 0.3s;
}

/* 被选中的主题选项样式 */
.theme-option.selected {
	border-color: #007bff;
}

/* 主题预览框 */
.preview {
	width: 100px;
	height: 80px;
	border-radius: 4px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 浅色模式预览 */
.light-preview {
	background: #fff;
	border: 1px solid #ccc;
}

/* 深色模式预览 */
.dark-preview {
	background: #333;
	border: 1px solid #555;
}
</style>
