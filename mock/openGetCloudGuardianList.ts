import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	withAbnormalList: boolean;
	filter: {
		all: boolean;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取云守护告警列表 */
const r = Random;
const mockOpenGetInspectionList: MockMethod = {
	url: "/iotp/api/open/eventManagement/cloudGuardian/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 30),
					},
					"results|1-3": [
						{
							cloudGuardianID: r.integer(0, 10),
							cloudGuardianStates: [
								{
									time: r.datetime("yyyy-MM-dd HH:mm:ss"),
									state: "reported",
									content: "[虚拟xx面板]发生告警事件",
								},
								{
									time: r.datetime("yyyy-MM-dd HH:mm:ss"),
									state: "eliminated",
									content: "告警已消除",
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
				errmsg: "获取云守护告警列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetInspectionList;
