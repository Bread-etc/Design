import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	secret: string; // 第三方服务的身份秘钥 [平台管理 - 开放接口 - API接口]
};

/* 用于开放接口 的 获取第三方服务的访问授权 */
const r = Random;
const mockOpenGetAccessToken: MockMethod = {
	url: "/iotp/api/open/accessControl/accessToken/get",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		const mockData = Mock.mock({
			"data|1-5": [
				{
					appTypeID: r.string("lower", 10, 16),
					appTypeName: r.cword(4),
					appID: r.increment(),
					appName: r.cword(4),
					accessToken: r.string("lower", 10, 16),
					expireIn: 7200,
				},
			],
		});

		return {
			code: 0,
			mockData,
		};
	},
};
