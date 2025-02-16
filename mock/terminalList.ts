import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		terminalPolicyIDs: number[];
		terminalPolicyNames: string[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取终端边缘策略列表 */
const r = Random;
const mockTerminalList: MockMethod = {
	url: "/iotp/api/open/policyMangement/edge/terminal/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: r.integer(0, 10),
					},
					"results|1-3": [
						{
							terminalPolicyID: res.filter.terminalPolicyIDs[0],
							terminalPolicyNames: res.filter.terminalPolicyNames[0],
							description: "网关边缘策略",
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
				errmsg: "获取终端边缘策略列表失败",
				data: {},
			};
		}
	},
};

export default mockTerminalList;
