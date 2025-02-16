import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		timingPolicyIDs: number[];
		timingPolicyNames: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取定时策略列表 */
const r = Random;
const mockTimingList: MockMethod = {
	url: "/iotp/api/open/policyMangement/platform/timing/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: 0,
					},
					"results|1-4": [
						{
							timingPolicyID: res.filter.timingPolicyIDs[0],
							timingPolicyName: res.filter.timingPolicyNames[0],
							description: "情景策略",
							enable: true,
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
				errmsg: "获取定时策略列表失败",
				data: {},
			};
		}
	},
};

export default mockTimingList;
