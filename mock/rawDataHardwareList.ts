import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		hardwareTypeID: string;
		hardwareIDs: string[];
		hardwareNames: string[];
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

/* 获取硬件数据列表 */
const r = Random;
const mockRawDataHardwareList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/rawData/hardware/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			// 递增从 1 开始
			let dataID = 1;

			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 30),
					},
					"results|8-15": [
						{
							dataID: () => dataID++,
							hardwareTypeID: res.filter.hardwareTypeID,
							hardwareID: res.filter.hardwareIDs[0],
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							states: {
								stateID: r.string("upper", 10) + "_1",
								value: r.integer(220, 330),
							},
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
				errmsg: "获取硬件数据列表失败",
				data: {},
			};
		}
	},
};

export default mockRawDataHardwareList;
