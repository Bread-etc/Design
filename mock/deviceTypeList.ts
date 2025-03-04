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
const mockDeviceTypeList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;

		if (!res.accessToken) {
			return {
				code: 2001,
				errmsg: "获取设备类型列表失败",
				data: {},
			};
		}

		const generateRandomDeviceType = () => ({
			deviceTypeID: () => Random.string("lower", 30),
			info: {
				deviceClassification: () => Random.pick(["Type_A", "Type_B", "Type_C"]),
				icon: Random.image(),
				description: () => Random.csentence(1, 4),
			},
			"states|1-4": [
				{
					stateID: () => Random.string("upper", 10, 15),
					stateName: () => Random.cword(2, 4),
					unit: () => Random.pick(["kw", "w", "v", "kv", "a"]),
					valueType: () => Random.pick(["int", "float", "string", "enum"]),
					valueRange: {
						min: 0,
						max: () => Random.integer(1000, 9999),
					},
					controllable: () => Random.boolean(),
				},
			],
			"configs|1-3": [
				{
					configID: () => Random.string("upper", 20),
					configName: () => Random.cword(4, 6),
					valueType: () => Random.pick(["int", "float", "string", "enum"]),
					valueRange: {
						0: "关闭",
						1: "打开",
					},
					controllable: () => Random.boolean(),
				},
			],
		});

		const mockData = Mock.mock({
			"data|3-8": res.filter.deviceTypeIDs.length
				? res.filter.deviceTypeIDs.map((id, index) => ({
						deviceTypeID: id,
						info: {
							deviceClassification: () => Random.pick(["分类A", "分类B", "分类C"]),
							deviceTypeName: () => Random.cword(4, 8),
							icon: () => Random.image(),
							description: () => Random.csentence(10, 20),
						},
						"states|1-6": [
							{
								stateID: () => Random.string("upper", 10, 15),
								stateName: () => Random.cword(2, 4),
								unit: () => Random.pick(["KW", "W", "V", "KV", "A"]),
								valueType: () => Random.pick(["int", "float", "double"]),
								valueRange: {
									min: 0,
									max: () => Random.integer(1000, 9999),
								},
								controllable: () => Random.boolean(),
							},
						],
						"configs|1-3": [
							{
								configID: () => Random.string("upper", 20),
								configName: () => Random.cword(4, 6),
								valueType: () => Random.pick(["int", "float", "string", "enum"]),
								valueRange: {
									0: "关闭",
									1: "打开",
								},
								controllable: () => Random.boolean(),
							},
						],
					}))
				: [generateRandomDeviceType()],
		});

		return {
			code: 0,
			data: mockData,
		};
	},
};

export default mockDeviceTypeList;
