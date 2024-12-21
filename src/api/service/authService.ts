import request from "@/utils/request";

class AuthService {
	async login(username: string, password: string) {
		try {
			const res = await request.post("/api/v1/login", { username, password });
			if (res.code === 200) {
				return res.data;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new AuthService();
