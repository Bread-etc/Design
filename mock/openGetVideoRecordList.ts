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
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceIDs: string[];
		deviceNames: string[];
		alarmTypes: string[];
		alarmLevels: string[];
		alarmPolicyNames: string[];
		contents: string[];
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取视频记录列表 */
const r = Random;
const mockOpenGetVideoRecordList: MockMethod = {
	url: "/iotp/api/open/eventManagement/vedioRecord/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				positioning: {
					left: r.integer(0, 30),
				},
				"results|1-4": [
					{
						vedioRecordID: r.integer(0, 10),
						info: {
							timeStart: r.datetime("yyyy-MM-dd HH:mm:ss"),
							timeEnd: r.datetime("yyyy-MM-dd HH:mm:ss"),
							alarmType: "rangeAlarm",
							alarmLevel: "critical",
							alarmPolicyName: "[服务器]值域告警",
							content: "[物联网]机房（空间）的服务器告警，CPU利用率：94.00%",
						},
						space: {
							spaceID: res.filter.spaceIDs[0],
							spaceName: res.filter.spaceNames[0],
						},
						triggerDevice: {
							deviceTypeID: res.filter.deviceTypeIDs[0],
							deviceTypeName: res.filter.deviceTypeNames[0],
							deviceID: res.filter.deviceIDs[0],
							deviceName: res.filter.deviceNames[0],
						},
						ipc: {
							deviceTypeID: r.string("lower", 30),
							deviceTypeName: r.cword(3, 6),
							deviceID: r.id(),
							deviceName: r.cword(5, 7),
							nvrIP: "ip" + "192.168.1.0",
							nvrPort: 8080,
							nvrChannel: 2,
						},
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2000,
				errmsg: "获取视频记录列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetVideoRecordList;
