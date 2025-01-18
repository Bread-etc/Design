<template>
	<!-- 模态框主结构 -->
	<div
		class="modal fade"
		id="exampleModal"
		tabindex="-1"
		aria-labelledby="modalTitle"
		aria-hidden="true"
	>
		<div
			class="modal-dialog modal-dialog-centered"
			:class="{ 'modal-lg': size === 'lg', 'modal-sm': size === 'sm' }"
		>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle">{{ title }}</h5>
					<button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<!-- 插槽，用于传递内容 -->
					<slot></slot>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-danger btn-sm" @click="closeModal">
						取消
					</button>
					<button
						type="button"
						class="btn btn-outline-primary btn-sm"
						v-if="onConfirm"
						@click="confirmModal"
					>
						确定
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import Modal from "bootstrap/js/dist/modal";

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

let modalInstance: Modal | null = null;

onMounted(() => {
	// 初始化 Bootstrap 的 Modal 实例
	const modalElement = document.getElementById("exampleModal");
	if (modalElement) {
		modalInstance = new Modal(modalElement, { backdrop: "static", keyboard: true });
	}
});

// 监听 visible 属性的变化
watch(
	() => props.visible,
	(newVal) => {
		if (newVal) {
			modalInstance?.show(); // 显示模态框
		} else {
			modalInstance?.hide(); // 隐藏模态框
		}
	},
);

/* 关闭模态框方法 */
function closeModal() {
	emits("update:visible", false); // 发出事件通知父组件，将 visible 设置为 false
}

/* 确认模态框方法 */
function confirmModal() {
	props.onConfirm?.(); // 如果提供了 onConfirm 回调，则执行
	closeModal(); // 执行后关闭模态框
}
</script>
