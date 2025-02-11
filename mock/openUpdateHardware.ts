import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		hardwareClassifications: string[];
		hardwareTypeIDs: string[];
		hardwareIDs: string[];
		hardwareNames: string[];
		hardwareStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
	info: {
		spaceID: number;
		hardwareName: string;
	};
};

/* 编辑硬件 */
const r = Random;
const mockOpenUpdateHardware: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/update",
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
						hardwareID: r.string("upper", 10),
						hardwareName: r.string("upper", 10),
						result: "编辑成功",
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
				errmsg: "编辑硬件失败",
				data: [
					{
						success: false,
						hardwareTypeID: r.string("lower", 30),
						hardwareTypeName: r.cword(4, 6),
						hardwareID: r.string("upper", 10),
						hardwareName: r.string("upper", 10),
						result: "空间下存在相同的硬件名称",
					},
				],
			};
		}
	},
};

export default mockOpenUpdateHardware;
