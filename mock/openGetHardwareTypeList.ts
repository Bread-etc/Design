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
		labelName: string[];
		manufactoryTypes: string[];
	};
};

/* 获取硬件类型列表 */
const r = Random;
const mockOpenGetHardwareTypeList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						hardwareTypeID: r.string("lower", 30),
						info: {
							hardwareTypeName: r.cword(2, 6),
							icon: r.image("200x100", "#4A7BF7", "Hardware"),
							description: r.csentence(1, 3),
							model: r.string("upper", 10),
							manufactory: r.cword(2, 4),
							accessway: r.string(2, 4),
							pwoerSupplyMode: r.integer(200, 220) + "V",
							label: [r.pick(["label1", "label2", "label3"])],
						},
						"states|1-5": [
							{
								stateID: r.string("upper", 5, 15),
								stateName: r.cword(2, 4),
								unit: r.pick(["w", "watt", "kv", "v", "A"]),
								valueType: r.pick(["int", "float", "double"]),
								valueRange: [
									{
										min: r.integer(0, 10),
										max: r.integer(10, 1000),
									},
								],
								controllable: r.pick([true, false]),
							},
						],
						"configs|1-2": [
							{
								configID: r.string("upper", 5, 15),
								configName: r.cword(4, 6),
								valueType: r.pick(["enum", "int", "float"]),
								valueRange: {
									"0": "关闭",
									"1": "打开",
								},
								controllable: true,
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
				code: 1000,
				errMsg: "获取硬件类型列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetHardwareTypeList;
