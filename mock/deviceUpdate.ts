import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceIDs: string[];
		deviceNames: string[];
		deviceStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
	info: {
		spaceID: number;
		deviceName: string;
		labelID: number;
	};
};

/* 编辑设备 用于重命名和移动设备 */
const r = Random;
const mockDeviceUpdate: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/update",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						success: true,
						deviceTypeID: res.filter.deviceTypeIDs[0],
						deviceTypeName: r.cword(4, 6),
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
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
						deviceTypeID: res.filter.deviceTypeIDs[0],
						deviceTypeName: r.cword(4, 6),
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
						result: "空间下存在相同的硬件名称",
					},
				],
			};
		}
	},
};

export default mockDeviceUpdate;
