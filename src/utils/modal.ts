import ModalComponent from "@/components/ModalComponent.vue";
import { createApp, h, ref } from "vue";
import type { JSX } from "vue/jsx-runtime";

interface ModalOptions {
	title?: string;
	size?: "sm" | "lg" | "";
	content?: string | (() => JSX.Element);
	onConfirm?: () => void;
}

const modalVisible = ref(false);
const modalOptions = ref<ModalOptions>();

function showModal(options: ModalOptions) {
	modalOptions.value = options;
	modalVisible.value = true;
}

function closeModal() {
	modalVisible.value = false;
}

// 提供给外部调用的方法
export function useModal() {
	return { showModal, closeModal };
}

// 自动渲染 ModalComponent
const container = document.createElement("div");
document.body.appendChild(container);

createApp({
	setup() {
		return () => {
			if (modalVisible.value) {
				return h(
					ModalComponent,
					{
						visible: modalVisible.value,
						title: modalOptions.value?.title || "Modal",
						size: modalOptions.value?.size || "",
						onConfirm: modalOptions.value?.onConfirm,
						"onUpdate:visible": (visible: boolean) => (modalVisible.value = visible),
					},
					{
						default:
							typeof modalOptions.value?.content === "function"
								? modalOptions.value.content
								: () => modalOptions.value?.content || "",
					},
				);
			}
			return null;
		};
	},
}).mount(container);
