import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeIDs: string;
		deviceTypeNames: string;
		deviceIDs: string[];
		deviceNames: string[];
		deviceStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
	states: {
		stateID: string;
	}[];
};

/* 撤销控制设备 支持批量操作 */
const r = Random;
const mockOpenCancelDevice: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/cancel",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						success: true,
						deviceTypeID: res.filter.deviceTypeIDs[0],
						deviceTypeName: res.filter.deviceTypeNames[0],
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
						result: "取消控制成功",
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
				errmsg: "取消控制失败",
				data: [
					{
						success: false,
						deviceTypeID: res.filter.deviceTypeIDs[0],
						deviceTypeName: res.filter.deviceTypeNames[0],
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
						result: "硬件不存在",
					},
				],
			};
		}
	},
};

export default mockOpenCancelDevice;
