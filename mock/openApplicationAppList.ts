import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		appTypeIDs: string[];
		appIDs: number[];
		appNames: string[];
	};
};

/* 获取应用列表 */
const r = Random;
const mockOpenApplicationAppList: MockMethod = {
	url: "/iotp/api/open/applicationManagement/app/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						appTypeID: r.string("lower", 5, 15),
						appID: r.integer(0, 10),
						appName: r.cword(3, 6),
						description: r.cword(3, 6),
						background: r.image(),
						"systems|1-3": [
							{
								systemTypeID: r.string("lower", 5, 15),
							},
						],
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 1000,
				errMsg: "获取应用列表错误",
				data: {},
			};
		}
	},
};

export default mockOpenApplicationAppList;
