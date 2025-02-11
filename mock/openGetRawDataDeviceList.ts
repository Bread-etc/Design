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
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取设备数据列表 */
const r = Random;
const mockOpenGetRawDataDeviceList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/rawData/device/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 30),
					},
					"results|1-3": [
						{
							dataID: r.integer(0, 10),
							deviceTypeID: res.filter.deviceTypeID,
							deviceID: res.filter.deviceIDs[0],
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							states: [
								{
									stateID: "POWERS_1",
									value: r.integer(220, 330),
								},
								{
									stateID: "VOLTAGE_1",
									value: r.integer(220, 330),
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
				code: 2000,
				errmsg: "获取设备数据列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetRawDataDeviceList;
