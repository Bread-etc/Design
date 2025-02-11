import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		cloudGuardianPolicyIDs: string[];
		cloudGuardianPolicyNames: string[];
		cloudGuardianPolicyTypes: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取云守护策略列表 */
const r = Random;
const mockOpenGetPolicyCloudGuardianList: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/cloudGuardian/list",
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
							cloudGuardianPolicyID: res.filter.cloudGuardianPolicyIDs[0],
							cloudGuardianPolicyName: res.filter.cloudGuardianPolicyNames[0],
							cloudGuardianPolicyType: res.filter.cloudGuardianPolicyTypes[0],
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
				errmsg: "获取云守护策略列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetPolicyCloudGuardianList;
