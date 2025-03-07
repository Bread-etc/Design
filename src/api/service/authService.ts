import request from "@/utils/request";
import type { LoginParams, LoginResult } from "../interface/Auth";

/* 公共接口 - 用户逻辑服务 - 发放accessToken */
class AuthService {
	async login(info: LoginParams): Promise<LoginResult> {
		try {
			const params = {
				api_token: info.token,
			};

			let role: string | null = null;

			if (info.username === "admin" && info.password === "admin") {
				role = "admin";
			} else if (info.username === "student" && info.password === "gdut") {
				role = "student";
			} else {
				throw new Error("用户名或密码错误");
			}

			const res = await request.post<{ accessToken: string; expiresIn: number }>(
				"/api/v1/accessToken",
				params,
			);

			// 确保返回的数据符合 LoginResult 结构
			return {
				accessToken: res.accessToken,
				expiresIn: res.expiresIn,
				role,
			};
		} catch (err) {
			console.error("登录失败:", err);
			throw err;
		}
	}
}

export default new AuthService();
