import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		hardwareTypeID: string;
		hardwareTypeName: string;
		hardwareIDs: string[];
		hardwareNames: string[];
		hardwareStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
	states: [
		{
			stateID: string;
			value: number;
			expireIn: number;
		},
	];
	configs: [
		{
			configID: string;
			value: number;
		},
	];
};

/* 用户控制硬件，支持批量操作 */
const r = Random;
const mockHardwareControl: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/control",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						success: true,
						hardwareTypeID: r.string("lower", 30),
						hardwareTypeName: r.cword(4, 6),
						hardwareID: r.id(),
						hardwareName: r.string("lower", 10),
						result: "控制硬件成功",
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			const mockFailData = Mock.mock({
				"data|2": [
					{
						success: r.pick([false, true]),
						hardwareTypeID: r.string("lower", 30),
						hardwareTypeName: r.cword(4, 6),
						hardwareID: r.id(),
						hardwareName: r.string("lower", 10),
						result: r.pick(["硬件不存在", "控制硬件成功"]),
					},
				],
			});

			return {
				code: 2001,
				errmsg: "控制硬件失败",
				mockFailData,
			};
		}
	},
};

export default mockHardwareControl;
