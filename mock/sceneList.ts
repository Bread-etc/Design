import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		scenePolicyIDs: number[];
		scenePolicyNames: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取情景策略列表 */
const r = Random;
const mockOpenGetPlatformSceneList: MockMethod = {
	url: "/iotp/api/open/policyMangement/platform/scene/list",
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
							scenePolicyID: res.filter.scenePolicyIDs[0],
							scenePolicyName: res.filter.scenePolicyNames[0],
							scenePolicyType: "space",
							description: "情景策略",
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
				errmsg: "获取情景策略列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetPlatformSceneList;
