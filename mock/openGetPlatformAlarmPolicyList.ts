import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		alarmPolicyIDs: number[];
		alarmPolicyNames: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取策略告警列表 */
const r = Random;
const mockOpenGetPlatformAlarmPolicyList: MockMethod = {
	url: "/iotp/api/open/policyManagement/alarm/policy/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: r.integer(0, 3),
					},
					"results|1-3": [
						{
							alarmPolicyID: res.filter.alarmPolicyIDs[0],
							alarmPolicyName: res.filter.alarmPolicyNames[0],
							description: "告警策略",
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
				errmsg: "获取告警策略列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetPlatformAlarmPolicyList;
