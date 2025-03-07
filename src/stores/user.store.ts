import { defineStore } from "pinia";
import authService from "@/api/service/authService";
import type { UserState, LoginParams } from "@/api/interface/Auth";

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		accessToken: null,
		username: "",
		isAuthenticated: false,
		expiresIn: null,
		role: null,
	}),

	actions: {
		// 登录逻辑
		async login(info: LoginParams) {
			try {
				const res = await authService.login(info);
				this.accessToken = res.accessToken;
				this.username = info.username;
				this.isAuthenticated = true;
				this.expiresIn = Date.now() + res.expiresIn * 1000; // 计算绝对过期时间;
				this.role = res.role;
			} catch (err) {
				throw err;
			}
		},

		// 验证 Token 是否有效
		validateToken() {
			if (this.accessToken && this.expiresIn) {
				if (Date.now() > this.expiresIn) {
					this.logout(); // Token 过期自动登出
				}
			}
		},

		// 登出逻辑
		logout() {
			this.accessToken = null;
			this.username = "";
			this.isAuthenticated = false;
			this.expiresIn = null;
			this.role = "";
		},
	},
	// 启用持久化
	persist: true,
});
