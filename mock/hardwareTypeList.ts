import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	fields: string[];
	filter: {
		all: boolean;
		hardwareTypeIDs: string[];
		hardwareTypeName: string[];
		labelNames: string[];
		manufactoryTypes: string[];
	};
};

/* 公共接口 - 获取硬件类型列表 */
const mockHardwareTypeList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|3-7": [
					{
						hardwareTypeID: () => "HARDWARE_" + Random.string("upper", 4),
						info: {
							hardwareTypeName: () => "硬件" + Random.integer(1, 1000),
							icon: Random.image("200x100", "#4A7BF7", "Hardware"),
							description: () => Random.csentence(1, 3),
							model: () => Random.string("upper", 10),
							manufactory: "信锐",
							accessway: "LoRa",
							powerSupplyMode: "AC220V",
							labelNames: ["开关", "插座"],
						},
						"states|1-3": [
							{
								stateID: () => "DEV_" + Random.string("upper", 6),
								stateName: () => Random.pick(["功率", "电流", "开关状态", "MAC地址"]),
								unit: () => Random.pick(["w", "A", "V"]),
								valueType: () => Random.pick(["int", "float", "enum", "string"]),
								valueRange: [
									{
										min: 0,
										max: () => Random.integer(1000, 9999),
									},
								],
								controllable: () => Random.boolean(),
							},
						],
						"configs|1-3": [
							{
								configID: () => "DEV_" + Random.string("upper", 10),
								configName: () => Random.cword(2, 4),
								valueType: () => Random.pick(["int", "float", "enum", "string"]),
								valueRange: {
									"0": "关闭",
									"1": "打开",
								},
								controllable: () => Random.boolean(),
							},
						],
					},
				],
			});

			return {
				code: 0,
				data: mockData,
			};
		} else {
			return {
				code: 1000,
				errMsg: "获取硬件类型列表失败",
				data: {},
			};
		}
	},
};

export default mockHardwareTypeList;
