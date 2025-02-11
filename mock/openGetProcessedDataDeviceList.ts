import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	dataTypeIDs: number[];
	filter: {
		taskID: number;
		dataSourceID: number;
		aggregation: string;
		deviceIDs: string[];
		deviceNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: number;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取设备加工数据列表 */
const r = Random;
const mockOpenGetProcessedDataDeviceList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/processedData/device/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 10),
					},
					"results|1-3": [
						{
							dataID: r.integer(0, 10),
							deviceTypeID: r.string("lower", 30),
							deviceID: res.filter.deviceIDs[0],
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							data: [
								{
									fieldID: "max",
									value: r.integer(220, 330),
								},
								{
									field: "min",
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
				errmsg: "获取设备加工数据列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetProcessedDataDeviceList;
