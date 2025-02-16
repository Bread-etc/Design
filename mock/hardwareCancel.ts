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
	states: { stateID: string }[];
};

/* 撤销控制硬件 */
const r = Random;
const mockHardwareCancel: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/cancel",
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
						result: "撤销控制成功",
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
						result: r.pick(["硬件不存在", "撤销控制成功"]),
					},
				],
			});

			return {
				code: 2001,
				errmsg: "撤销控制失败",
				mockFailData,
			};
		}
	},
};

export default mockHardwareCancel;
