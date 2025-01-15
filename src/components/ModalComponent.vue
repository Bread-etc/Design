<template>
	<!-- 模态框主结构 -->
	<div v-if="visible" class="modal fade show" tabindex="-1" :class="{ 'd-block': visible }">
		<div
			class="modal-dialog modal-dialog-centered"
			:class="{ 'modal-lg': size === 'lg', 'modal-sm': size === 'sm' }"
		>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle">{{ title }}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						arai-label="Close"
						@click="close"
					></button>
				</div>
				<div class="modal-body">
					<!-- 插槽，用于传递内容 -->
					<slot />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="close">取消</button>
					<button type="button" class="btn btn-primary" v-if="onConfirm" @click="confirm">
						确定
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
	title: {
		type: String,
		default: "Modal Title",
	},
	visible: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: "",
	},
	onConfirm: Function, // 确认按钮点击时的回调函数
});

const emits = defineEmits(["update:visible"]); // 允许父组件通过 v-model 更新 visible 属性

/* 关闭模态框方法 */
function close() {
	emits("update:visible", false); // 发出事件通知父组件，将 visible 设置为 false
}

/* 确认模态框方法 */
function confirm() {
	props.onConfirm?.(); // 如果提供了 onConfirm 回调，则执行
	close(); // 执行后关闭模态框
}
</script>

<style scoped>
/* 模态框背景样式 */
.modal.fade {
	background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}
</style>
