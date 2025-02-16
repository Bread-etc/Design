import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		taskIDs: number[];
		taskNames: string[];
		taskTypes: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取加工任务列表 */
const r = Random;
const mockProcessingTaskList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/processingTask/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: r.integer(0, 5),
					},
					"results|1-5": [
						{
							taskID: res.filter.taskIDs[0],
							taskName: res.filter.taskNames[0],
							taskType: res.filter.taskTypes[0],
							description: r.csentence(0, 3),
							state: "ok",
							dataSources: [
								{
									dataSourceID: 1,
									deviceTypeID: r.string("lower", 30),
									deviceTypeName: r.cword(4, 5),
									stateID: "POWERS_1",
									stateName: "电量",
								},
							],
							"dataTypes|4": [
								{
									dataTypeID: r.pick(["sum", "count", "average", "max", "min"]),
									dataTypeName: r.pick(["总和", "数量", "平均值", "最大值", "最小值"]),
									unit: r.pick(["w", "次"]),
								},
							],
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
				code: 2000,
				errmsg: "获取加工列表失败",
				data: {},
			};
		}
	},
};

export default mockProcessingTaskList;
