import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		appTypes: string[];
	};
};

/* 获取应用类型列表 */
const r = Random;
const mockApplicationTypeList: MockMethod = {
	url: "/iotp/api/open/applicationManagement/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					"apps|1-3": [
						{
							appTypeID: r.string("lower", 5, 15),
							appTypeName: r.cword(3, 6),
							description: r.cword(3, 6),
						},
					],
					"systems|1-3": [
						{
							systemTypeID: r.string("lower", 5, 15),
							systemTypeName: r.cword(3, 6),
							description: r.cword(3, 6),
						},
					],
				},
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 1000,
				errMsg: "获取应用类型列表错误",
				data: {},
			};
		}
	},
};

export default mockApplicationTypeList;
