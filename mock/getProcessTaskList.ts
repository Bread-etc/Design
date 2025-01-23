import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 用于获取加工任务列表 */
const r = Random;
const mockGetProcessTaskList: MockMethod = {
	url: "/api/open/dataAnalysis/processingTask/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				data: {
					paging: {
						nextOffset: 0,
					},
					"result|1-4": [
						{
							taskID: r.integer(0, 10),
							taskName: r.cword(1, 6),
							taskType: r.pick(["statisic", "trend"]),
							description: r.csentence(1, 3),
							state: "",
							"dataTypes|1-4": [
								{
									dataTypeID: r.string("lower", 1, 10),
									dataTypeName: r.cword(1, 6),
									unit: r.pick(["个", "次", "小时", "天", "月", "年"]),
								},
							],
							"dataSources|1-3": [
								{
									dataSourceID: r.string("lower", 1, 4),
									deviceID: r.string("lower", 32),
									deviceTypeName: r.cword(1, 6),
									stateID: r.string("upper", 10, 20),
									stateName: r.cword(1, 6),
								},
							],
						},
					],
				},
			});

			return mockData;
		} else {
			return {
				code: 401,
				msg: "无效的 accessToken",
				data: [],
			};
		}
	},
};

export default mockGetProcessTaskList;
