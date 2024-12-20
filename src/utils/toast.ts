// 独立的 Toast 组件
import { Toast } from "bootstrap";

/**
 * 显示 Bootstrap Toast
 * @param title 消息标题
 * @param message 消息内容
 * @param type 消息类型 ("success", "info", "warning", "danger")
 */
export function showToast(
	title: string,
	message: string,
	type: "success" | "info" | "warning" | "danger",
) {
	const toastElement = document.createElement("div");
	toastElement.className = `
        toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-0
    `;
	toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong>: ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
	document.body.appendChild(toastElement);

	const toast = new Toast(toastElement);
	toast.show();

	// Toast 自动消失后移除
	toastElement.addEventListener("hidden.bs.toast", () => {
		document.body.removeChild(toastElement);
	});
}
