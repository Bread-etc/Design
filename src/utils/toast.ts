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
	// 确保 Toast 容器存在
	let toastContainer = document.getElementById("toast-container");
	if (!toastContainer) {
		toastContainer = document.createElement("div");
		toastContainer.id = "toast-container";
		toastContainer.className = `
            position-fixed top-0 end-0 p-3
        `;
		// 确保 Toast 在最前方
		toastContainer.style.zIndex = "1050";
		document.body.appendChild(toastContainer);
	}

	// 创建 Toast 元素
	const toastElement = document.createElement("div");
	toastElement.className = `
        toast align-items-center text-bg-${type} border-0 mb-2
    `;
	toastElement.style.minWidth = "300px"; // 确保合理的宽度
	toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong>: ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
	toastContainer.appendChild(toastElement);

	// 显示 Toast
	const toast = new Toast(toastElement);
	toast.show();

	// Toast 自动消失后移除
	toastElement.addEventListener("hidden.bs.toast", () => {
		toastContainer?.removeChild(toastElement);
		// 如果容器内没有 Toast，则移除容器
		if (toastContainer?.childElementCount === 0) {
			document.body.removeChild(toastContainer);
		}
	});
}
