// request/index
import axios, { type AxiosResponse } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { RequestConfig, RequestInterceptors, CreateRequestConfig } from "./types";

class Request {
	// axios 实例
	instance: AxiosInstance;
	// 拦截器对象
	interceptorsObj?: RequestInterceptors<AxiosResponse>;
	// * 存放取消请求控制器 Map
	abortControllerMap: Map<string, AbortController>;

	constructor(config: CreateRequestConfig) {
		this.instance = axios.create(config);
		// * 初始化存放取消请求控制器Map
		this.abortControllerMap = new Map();
		this.interceptorsObj = config.interceptors;

		// 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
		this.instance.interceptors.request.use(
			(res: InternalAxiosRequestConfig) => {
				const controller = new AbortController();
				const url = res.url || "";
				res.signal = controller.signal;
				this.abortControllerMap.set(url, controller);
				return res;
			},
			(err: any) => err,
		);

		// 使用实例拦截器
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch,
		);

		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch,
		);

		// 全局响应拦截器保证最后执行
		this.instance.interceptors.response.use(
			// 接口的数据都在 res.data 下，所以直接返回 res.data
			(res: AxiosResponse) => {
				const url = res.config.url || "";
				this.abortControllerMap.delete(url);
				return res.data;
			},
			(err: any) => err,
		);
	}

	request<T>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config as any);
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors(res);
					}

					resolve(res);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	/* 取消全部请求 */
	cancelAllRequest(url: string | string[]) {
		const urlList = Array.isArray(url) ? url : [url];
		for (const _url of urlList) {
			this.abortControllerMap.get(_url)?.abort();
			this.abortControllerMap.delete(_url);
		}
	}
}

export default Request;
export type { RequestConfig, RequestInterceptors };
