import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		gatewayPolicyIDs: number[];
		gatewayPolicyNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
	pagging: {
		offset: number;
		size: number;
	};
};

/* 获取网关边缘策略列表 */
const r = Random;
const mockGatewayList: MockMethod = {
	url: "/iotp/api/open/policyMangement/edge/gateway/list",
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
							gatewayPolicyID: res.filter.gatewayPolicyIDs[0],
							gatewayPolicyName: res.filter.gatewayPolicyNames[0],
							description: r.csentence(1, 3),
							enable: true,
							spaceIDs: res.filter.spaceIDs,
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
				errmsg: "获取网关边缘策略列表失败",
				data: {},
			};
		}
	},
};

export default mockGatewayList;
