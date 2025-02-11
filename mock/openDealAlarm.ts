import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		timeStart: string;
		timeEnd: string;
		dateObjectIDs: number[];
		timeObjectIDs: number[];
		alarmLevels: string[];
		alarmStatus: string[];
		policyIDs: number[];
		policyNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
	};
};

/* 消除告警 */
const r = Random;
const mockOpenDealAlarm: MockMethod = {
	url: "/iotp/api/open/eventManagement/alarm/deal",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: [
					{
						success: true,
						alarmID: r.integer(0, 10),
						result: "消除告警成功",
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2001,
				errmsg: "消除告警失败",
				data: {},
			};
		}
	},
};

export default mockOpenDealAlarm;
