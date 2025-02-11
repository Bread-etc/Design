import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	fields: string[];
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
		spaceNames: number[];
		spaceRecursive: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取告警列表 */
const r = Random;
const mockOpenGetAlarmList: MockMethod = {
	url: "/iotp/api/open/eventManagement/alarm/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(10, 40),
					},
					"results|1-3": [
						{
							alarmID: r.integer(1000, 2000),
							info: {
								alarmTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
								alarmLevel: res.filter.alarmLevels[0],
								alarmStatus: res.filter.alarmStatus[0],
								content: r.csentence(1, 2),
								snapshots: ["/SPM/images/snapshots/1.jpg"],
							},
							policy: {
								policyID: res.filter.policyIDs[0],
								policyName: res.filter.policyNames[0],
							},
							space: {
								spaceID: res.filter.spaceIDs[0],
								spaceName: res.filter.spaceNames[0],
								spacePath: "spacePath",
							},
							device: {
								deviceTypeID: res.filter.deviceTypeIDs[0],
								deviceTypeNames: res.filter.deviceTypeNames[0],
								deviceID: r.id(),
								deviceName: r.cword(4, 6),
							},
							notification: {
								count: r.integer(0, 5),
								methods: ["sms", "app", "call", "dingding", "wechat"],
								"notifiers|1-3": [
									{
										accountID: r.integer(0, 10),
										accountName: r.cname(),
									},
								],
							},
							confirmation: {
								accountID: r.integer(0, 10),
								accountName: r.cname(),
								confirmTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							},
							deal: {
								accountID: r.integer(0, 10),
								accountName: r.cname(),
								dealTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							},
							vedios: [
								{
									info: {
										timeStart: r.datetime("yyyy-MM-dd HH:mm:ss"),
										timeEnd: r.datetime("yyyy-MM-dd HH:mm:ss"),
									},
									ipc: {
										deviceTypeID: res.filter.deviceTypeIDs[0],
										deviceTypeName: res.filter.deviceTypeNames[0],
										deviceID: r.id(),
										deviceName: r.cword(4, 6),
										nvrIP: r.id() + "ip",
										nvrPort: r.integer(0, 9999),
										nvrChannel: r.integer(0, 10),
									},
								},
							],
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
				code: 2001,
				errmsg: "获取告警列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetAlarmList;
