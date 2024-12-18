import { MockMethod } from "vite-plugin-mock";

const mockLogin: MockMethod = {
	// /api/v1/accessToken
	url: "/api/v1/login",
	method: "post",
	response: ({ body }) => {
		if (body.username === "admin" && body.password === "admin") {
			return {
				code: 200,
				msg: "Login successfully",
				data: {
					accessToken: "mock_access_token",
					expiresIn: 7200,
				},
			};
		} else {
			return {
				code: 401,
				msg: "用户名或密码错误",
				data: null,
			};
		}
	},
};

export default [mockLogin];
