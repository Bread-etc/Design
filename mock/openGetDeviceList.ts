import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	fields: string[];
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceIDs: string[];
		deviceNames: string[];
		deviceStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
	order: {
		field: string;
		key: string;
		orderBy: string;
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取设备列表 */
const r = Random;
const mockOpenGetDeviceList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/list",
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
							deviceTypeID: res.filter.deviceTypeIDs[0],
							deviceID: res.filter.deviceIDs[0],
							info: {
								spaceID: res.filter.spaceIDs[0],
								spaceName: res.filter.spaceNames[0],
								deviceTypeName: res.filter.deviceTypeNames[0],
								deviceName: res.filter.deviceNames[0],
								deviceStatus: "abnormal",
								statusDescription: r.pick(["在线", "离线"]),
								onlineDuration: r.integer(1000000, 9999999),
								onlineTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
								reportDuration: r.integer(1000000, 9999999),
								reportTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
								labelID: res.filter.labelIDs[0],
								labelName: res.filter.labelNames[0],
							},
							states: [
								{
									stateID: r.string("upper", 10),
									reported: 1,
									desired: 0,
									expireIn: 300,
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
				errmsg: "获取设备列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetDeviceList;
