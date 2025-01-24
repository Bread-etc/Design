import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		scenePolicyIDs: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 查看情景策略、获取情景策略列表 */
const r = Random;
const mockGetSceneList: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/scene/list",
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
					"results|1-3": [
						{
							scenePolicyID: r.integer(0, 10),
							scenePolicyName: r.cword(1, 6),
							scenePolicyType: r.pick(["space", "device"]),
							description: r.csentence(1, 3),
						},
					],
				},
			});

			let filteredData = mockData.data;

			if (res.filter.scenePolicyIDs && res.filter.scenePolicyIDs.length > 0) {
				filteredData.results = filteredData.results.filter((item: any) =>
					res.filter.scenePolicyIDs.includes(item.scenePolicyID),
				);
			}

			return {
				code: 0,
				data: filteredData,
			};
		} else {
			return {
				code: 1000,
				errmsg: "无效的 accessToken",
				data: {},
			};
		}
	},
};

export default mockGetSceneList;
