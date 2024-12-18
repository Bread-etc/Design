import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { Toast } from "bootstrap";

interface Result<T = any> {
	code: number | string;
	msg: string;
	data: T;
	total: number;
}

class Request {
	baseURL: string;
	timeout: number;

	constructor() {
		this.baseURL = import.meta.env.VITE_APP_BASE_URL;
		this.timeout = 50000;
	}

	request<T = any>(options: AxiosRequestConfig): Promise<Result<T>> {
		const instance: AxiosInstance = axios.create();
		this.setInterceptors(instance);
		const opts = this.mergeOptions(options);
		return instance(opts);
	}

	// GET 请求
	get<T = any>(url: string, data?: any, outHeaders = {}): Promise<Result<T>> {
		return this.request<T>({
			method: "get",
			url,
			params: { ...data },
			headers: outHeaders,
		});
	}

	// POST 请求
	post<T = any>(url: string, body = {}, outHeaders = {}): Promise<Result<T>> {
		return this.request<T>({
			method: "post",
			url,
			data: body, // 正确传递数据
			headers: outHeaders, // 正确传递头部信息
		});
	}

	mergeOptions(options: AxiosRequestConfig): AxiosRequestConfig {
		return {
			baseURL: this.baseURL,
			timeout: this.timeout,
			headers: options.headers || {},
			...options,
		};
	}

	// 设置拦截器
	setInterceptors(instance: AxiosInstance) {
		let loading: HTMLElement | null;

		// 请求拦截器
		instance.interceptors.request.use(
			(config) => {
				// 创建并显示 loading Spinner
				loading = document.createElement("div");
				loading.className =
					"d-flex justify-content-center align-items-center position-fixed top-50 start-50 translate-middle";
				loading.innerHTML = `
        <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
      `;
				document.body.appendChild(loading);

				return config;
			},
			(err: any) => {
				console.log(err);
				return Promise.reject(err);
			},
		);

		// 响应拦截器
		instance.interceptors.response.use(
			(res: AxiosResponse) => {
				console.log("🚀 ~ Response:", res);

				// 响应成功，移除 Loading spinner
				if (loading) {
					document.body.removeChild(loading);
				}

				const { status, data } = res;

				// 处理不同状态码
				switch (status) {
					case 200:
						return data;
					case 400:
						this.showErrorToast("请求错误", "无效的请求。请检查请求参数。");
						break;
					case 401:
						this.showErrorToast("认证错误", "您的会话已过期，请重新登录。");
						break;
					case 403:
						this.showErrorToast("权限错误", "您没有权限访问该资源。");
						break;
					case 404:
						this.showErrorToast("未找到", "请求的资源未找到。");
						break;
					case 500:
						this.showErrorToast("服务器错误", "服务器发生错误，请稍后再试。");
						break;
					case 502:
						this.showErrorToast("网关错误", "无法连接到目标服务器。");
						break;
					case 503:
						this.showErrorToast("服务不可用", "服务正在维护，请稍后再试。");
						break;
					default:
						this.showErrorToast("未知错误", "发生了未知的错误，请稍后再试。");
						break;
				}

				// 如果是非 200 状态码，返回的 data 可以根据需要处理，避免影响后续操作
				return data;
			},
			(err) => {
				console.log("axios error", err);

				if (loading) {
					document.body.removeChild(loading);
				}

				// 显示错误提示
				this.showErrorToast("请求失败", err.message);

				return Promise.reject(err);
			},
		);
	}

	// 显示 Bootstrap Toast
	showErrorToast(title: string, message: string) {
		const toastElement = document.createElement("div");
		toastElement.className =
			"toast align-items-center text-bg-danger border-0 position-fixed bottom-0 end-0 m-3";
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

		// Toast 自动消失后，移除 DOM 元素
		toastElement.addEventListener("hidden.bs.toast", () => {
			document.body.removeChild(toastElement);
		});
	}
}

export default new Request();
