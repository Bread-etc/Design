import { defineStore } from "pinia";
import authService from "@/api/service/authService";
import type { UserState, LoginResult } from "@/api/interface/Auth";

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		token: null,
		username: "",
		isAuthenticated: false,
	}),

	actions: {
		// 登录逻辑
		async login(username: string, password: string) {
			try {
				const res: LoginResult = await authService.login(username, password);
				this.token = res.accessToken;
				this.username = username;
				this.isAuthenticated = true;

				// 计算过期时间戳并持久化存储
				const expiresAt = Date.now() + res.expires * 1000; // 当前时间 + 有效时间(ms)
				localStorage.setItem("token", res.accessToken);
				localStorage.setItem("expiresAt", expiresAt.toString());
			} catch (err) {
				console.error("登录失败", err);
				throw err;
			}
		},

		// 加载 token
		loadToken() {
			const token = localStorage.getItem("token");
			const expiresAt = localStorage.getItem("expiresAt");

			if (token && expiresAt) {
				const nowTime = Date.now();
				if (nowTime < Number(expiresAt)) {
					this.token = token;
					this.isAuthenticated = true;
				} else {
					// token 已过期，清除存储的token
					this.logout();
				}
			}
		},

		// 登出逻辑
		logout() {
			this.token = null;
			this.username = "";
			this.isAuthenticated = false;

			// 清空 token
			localStorage.removeItem("token");
			localStorage.removeItem("expiresAt");
		},
	},
});
