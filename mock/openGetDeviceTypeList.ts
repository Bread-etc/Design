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
		deviceClassification: string[];
	};
};

/* 获取设备类型列表 */
const r = Random;
const mockOpenGetDeviceTypeList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-5": [
					{
						deviceTypeID: res.filter.deviceTypeIDs[0],
						info: {
							deviceClassification: res.filter.deviceClassification[0],
							deviceTypeName: res.filter.deviceTypeNames[0],
							icon: r.image(),
							description: res.filter.deviceTypeNames[0],
						},
						"states|1-6": [
							{
								stateID: r.string("upper", 10, 15),
								stateName: r.cword(2, 4),
								unit: r.pick(["KW", "W", "V", "KV", "A"]),
								valueType: r.pick(["int", "float", "double"]),
								valueRange: {
									min: 0,
									max: r.integer(1000, 9999),
								},
								controllable: r.pick([false, true]),
							},
						],
						"configs|1-3": [
							{
								configID: r.string("upper", 20),
								configName: r.cword(4, 6),
								valueType: "enum",
								valueRange: {
									0: "关闭",
									1: "打开",
								},
								controllable: r.pick([false, true]),
							},
						],
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2001,
				errmsg: "获取设备类型列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetDeviceTypeList;
