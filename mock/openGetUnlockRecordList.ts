import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		timeStart: string;
		timeEnd: string;
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		deviceTypeIDs: number[];
		deviceTypeNames: string[];
		deviceIDs: string[];
		deviceNames: string[];
		accountIDs: number[];
		accountNames: string[];
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取开锁记录 */
const r = Random;
const mockOpenGetUnlockRecordList: MockMethod = {
	url: "/iotp/api/open/eventManagement/unlockingRecord/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 30),
					},
					"results|1-5": [
						{
							unlockingRecordID: r.integer(0, 10),
							unlockingMethod: "fingerprint",
							unlockingTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							account: {
								accountID: r.integer(0, 10),
								accountName: r.cname() + "老师",
							},
							space: {
								spaceID: res.filter.spaceIDs[0],
								spaceName: res.filter.spaceNames[0],
							},
							device: {
								deviceTypeID: res.filter.deviceTypeIDs[0],
								deviceTypeName: res.filter.deviceTypeNames[0],
								deviceID: res.filter.deviceIDs[0],
								deviceName: res.filter.deviceNames[0],
							},
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
				errmsg: "获取开锁记录失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetUnlockRecordList;
