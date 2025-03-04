import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	fields: string[]; // 包含 info, states
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceIDs: string[];
		deviceNames: string[];
		deviceStatus: string[]; // 包含 normal abnormal
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
	order: {
		field: "info" | "state";
		key: string;
		orderBy: "asc" | "desc";
	};
	paging: {
		offset: number | null;
		size: number | null;
	};
};

/* 获取设备列表 */
const mockDeviceList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: Random.integer(0, 10),
					},
					"results|3-7": [
						{
							deviceTypeID: () => Random.string("lower", 30),
							deviceID: () => "VT_" + Random.string("upper", 10),
							info: {
								spaceID: () => Random.integer(0, 2000),
								spaceName: () => Random.cword(4),
								deviceTypeName: () => "设备类型_" + Random.cword(2, 4),
								deviceName: () => "设备_" + Random.cword(2, 4),
								deviceStatus: () => Random.pick(["abnormal", "normal"]),
								statusDescription: () => Random.pick(["在线", "离线"]),
								onlineDuration: () => Random.integer(1000000, 9999999),
								onlineTime: () => Random.datetime("yyyy-MM-dd HH:mm:ss"),
								reportDuration: () => Random.integer(1000000, 9999999),
								reportTime: () => Random.datetime("yyyy-MM-dd HH:mm:ss"),
								labelID: () => Random.integer(0, 10),
								labelName: () => Random.string("upper", 3),
							},
							states: [
								{
									stateID: () => "DEV_" + Random.string("upper", 6),
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
				data: mockData,
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

export default mockDeviceList;
