import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { showToast } from "./toast";
class Request {
	baseURL: string;
	timeout: number;

	constructor() {
		this.baseURL = "/api";
		this.timeout = 50000;
	}

	request<T = any>(options: AxiosRequestConfig): Promise<T> {
		const instance: AxiosInstance = axios.create();
		this.setInterceptors(instance);
		const opts = this.mergeOptions(options);
		return instance(opts);
	}

	// GET 请求
	get<T = any>(url: string, data?: any, outHeaders = {}): Promise<T> {
		return this.request<T>({
			method: "get",
			url,
			params: { ...data },
			headers: {
				"Content-Type": "application/json",
				...outHeaders,
			},
		});
	}

	// POST 请求
	post<T = any>(url: string, body = {}, outHeaders = {}): Promise<T> {
		return this.request<T>({
			method: "post",
			url,
			data: body, // 正确传递数据
			headers: {
				"Content-Type": "application/json",
				...outHeaders,
			}, // 正确传递头部信息
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
				console.error(err);
				return Promise.reject(err);
			},
		);

		// 响应拦截器
		instance.interceptors.response.use(
			(res: AxiosResponse) => {
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
						showToast("请求错误", "无效的请求，请检查参数。", "danger");
						break;
					case 401:
						showToast("认证错误", "您的会话已过期，请重新登录。", "danger");
						break;
					case 403:
						showToast("权限错误", "您没有权限访问该资源。", "warning");
						break;
					case 404:
						showToast("未找到", "请求的资源未找到。", "warning");
						break;
					case 500:
						showToast("服务器错误", "服务器发生错误，请稍后再试。", "danger");
						break;
					case 502:
						showToast("网关错误", "无法连接到目标服务器。", "danger");
						break;
					case 503:
						showToast("服务不可用", "服务正在维护，请稍后再试。", "warning");
						break;
					default:
						showToast("未知错误", "发生了未知的错误，请稍后再试。", "danger");
						break;
				}

				// 如果是非 200 状态码，返回的 data 可以根据需要处理，避免影响后续操作
				return res;
			},
			(err) => {
				if (loading) {
					document.body.removeChild(loading);
				}

				// 显示错误消息
				showToast("请求失败", err.message, "danger");
				return Promise.reject(err);
			},
		);
	}
}

export default new Request();
