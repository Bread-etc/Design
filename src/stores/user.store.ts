import { defineStore } from "pinia";
import authService from "@/api/service/authService";
import type { UserState, LoginResult } from "@/api/interface/Auth";

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		token: null,
		username: "",
		isAuthenticated: false,
		expiresAt: null, // 增加 expiresAt 状态字段
	}),

	actions: {
		// 登录逻辑
		async login(username: string, password: string) {
			try {
				const res: LoginResult = await authService.login(username, password);
				this.token = res.accessToken;
				this.username = username;
				this.isAuthenticated = true;
				this.expiresAt = Date.now() + res.expiresIn * 1000; // 当前时间 + 有效时间(ms)
			} catch (err) {
				throw err;
			}
		},

		// 验证 Token 是否有效
		validateToken() {
			if (this.token && this.expiresAt) {
				if (Date.now() > this.expiresAt) {
					this.logout(); // Token 过期自动登出
				}
			}
		},

		// 登出逻辑
		logout() {
			this.token = null;
			this.username = "";
			this.isAuthenticated = false;
			this.expiresAt = null;
		},
	},
	// 启用持久化
	persist: true,
});
