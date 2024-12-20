import request from "@/utils/request";
import { showToast } from "@/utils/toast";

class AuthService {
	async login(username: string, password: string) {
		try {
			const res = await request.post("/api/v1/login", { username, password });
			if (res.code === 200) {
				showToast("登录成功", "欢迎回来！", "success");
				return res.data;
			} else {
				showToast("登录失败", res.msg, "danger");
				throw new Error(res.msg);
			}
		} catch (error) {
			showToast("登录失败", "无法连接到服务器，请稍后重试。", "danger");
			throw error;
		}
	}
}

export default new AuthService();
