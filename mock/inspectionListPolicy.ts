import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		inspectionPolicyIDs: number[];
		inspectionPolicyNames: string[];
		inspectionPolicyTypes: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取巡检策略列表 */
const r = Random;
const mockInspectionListPolicy: MockMethod = {
	url: "/iotp/api/open/policyMangement/platform/inspection/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: 0,
					},
					"results|1-3": [
						{
							inspectionPolicyID: res.filter.inspectionPolicyIDs[0],
							inspectionPolicyName: res.filter.inspectionPolicyNames[0],
							inspectionPolicyType: res.filter.inspectionPolicyTypes[0],
							description: "巡检策略",
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
				errmsg: "获取巡检列表失败",
				data: {},
			};
		}
	},
};

export default mockInspectionListPolicy;
