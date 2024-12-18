import request from "@/utils/request";
import { Toast } from "bootstrap";

class AuthService {
	async login(username: string, password: string) {
		try {
			const res = await request.post("/api/v1/login", { username, password });
			if (res.code === 200) {
				// 登录成功
				console.log("login success", res.data);
				return res.data;
			} else {
				console.error("Login Error", res.msg);
				throw new Error(res.msg);
			}
		} catch (error) {
			console.error("Login Failed:", error);
			throw error;
		}
	}
}

export default new AuthService();
