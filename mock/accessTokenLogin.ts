import { MockMethod } from "vite-plugin-mock";

const mockLogin: MockMethod = {
	// /api/v1/accessToken
	url: "/iotp/api/v1/login",
	method: "post",
	response: ({ body }) => {
		if (body.username === "admin" && body.password === "admin") {
			return {
				code: 200,
				msg: "Login successfully",
				data: {
					accessToken: "mock_access_token",
					expiresIn: 7200,
					role: "admin",
				},
			};
		} else if (body.username === "student" && body.password === "gdut") {
			return {
				code: 200,
				msg: "Login successfully",
				data: {
					accessToken: "mock_access_token",
					expiresIn: 7200,
					role: "student",
				},
			};
		} else {
			return {
				code: 1000,
				errmsg: "用户名或密码错误",
				data: {},
			};
		}
	},
};

export default mockLogin;
