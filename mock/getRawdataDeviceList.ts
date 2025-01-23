import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		deviceTypeID: string;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		count: number;
	};
};

/* 用于提供用户需要设备的原始数据，生成个性化的统计图、趋势图等 */
const r = Random;
const mockRawdataDeviceList: MockMethod = {
	url: "/api/open/dataAnalysis/rawData/device/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				data: {
					positioning: {
						left: 0,
					},
					"result|1-4": [
						{
							dataID: r.integer(1000, 9999),
							deviceTypeID: r.id(),
							deviceID: r.id(),
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							"states|1-4": [
								{
									stateID: r.string("upper", 10, 16),
									value: r.pick([0, 1]),
								},
							],
						},
					],
				},
			});

			let filteredData = mockData.data;
			if (body.filter) {
				if (body.filter.deviceTypeID && body.filter.deviceTypeID.length > 0) {
					filteredData = filteredData.filter((item: any) => {
						body.filter.deviceTypeID.includes(item.deviceTypeID);
					});
				}
				if (body.filter.timeStart && body.filter.timeEnd) {
					filteredData = filteredData.filter((item: any) => {
						item.time >= body.filter.timeStart && item.time <= body.filter.timeEnd;
					});
				}
			}

			return {
				code: 0,
				data: filteredData,
			};
		} else {
			return {
				code: 401,
				msg: "无效的 accessToken",
				data: [],
			};
		}
	},
};

export default mockRawdataDeviceList;
