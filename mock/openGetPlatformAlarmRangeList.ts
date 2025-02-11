import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取值域告警列表 */
const r = Random;
const mockOpenGetPlatformAlarmRangeList: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/alarm/range/list",
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
							deviceTypeID: res.filter.deviceTypeIDs[0],
							deviceTypeName: res.filter.deviceTypeNames[0],
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
				errmsg: "获取值域告警列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetPlatformAlarmRangeList;
