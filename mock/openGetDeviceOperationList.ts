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
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 用于获取设备操作记录 */
const r = Random;
const mockOpenGetDeviceOperationList: MockMethod = {
	url: "/iotp/api/open/eventManagement/deviceOperation/list",
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
							deviceOperationID: r.integer(0, 10),
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							content: "设备上线",
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
				errmsg: "获取设备操作记录失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetDeviceOperationList;
