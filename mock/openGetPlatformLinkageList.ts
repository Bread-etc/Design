import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		linkagePolicyIDs: number[];
		linkagePolicyNames: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取联动策略列表 */
const r = Random;
const mockOpenGetPlatformLinkageList: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/linkage/list",
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
							linkagePolicyID: res.filter.linkagePolicyIDs[0],
							linkagePolicyName: res.filter.linkagePolicyNames[0],
							description: "联动策略",
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
				errmsg: "获取联动策略失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetPlatformLinkageList;
