import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		deviceTypeID: string;
		deviceIDs: string[];
		deviceNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number | null;
		sinceID: number | null;
		count: number | null;
	};
};

interface StateValue {
	stateID: string;
	value: number;
}

/* 获取设备数据列表 */
const mockRawDataDeviceList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/rawData/device/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			let dataID = 1;

			const mockData = Mock.mock({
				data: {
					positioning: {
						left: Random.integer(0, 30),
					},
					"results|8-18": [
						() => {
							const deviceTypeID =
								res.filter.deviceTypeID || "DEVICE_" + Random.string("lower", 30);
							const deviceID =
								res.filter.deviceIDs[0] || "VT" + Random.integer(1000000000, 9999999999);
							const time = Random.datetime("yyyy-MM-dd HH:mm:ss");

							// 生成多个 StateValue
							const states: StateValue[] = Array.from({ length: Random.integer(1, 4) }).map(() => ({
								stateID: Random.string("upper", 8) + "_1",
								value: Random.integer(200, 350),
							}));

							return {
								dataID: dataID++,
								deviceTypeID,
								deviceID,
								time,
								states,
							};
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
				code: 2000,
				errmsg: "获取设备数据列表失败",
				data: {},
			};
		}
	},
};

export default mockRawDataDeviceList;
