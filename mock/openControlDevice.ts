import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeID: string;
		deviceTypeName: string[];
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
		value: number;
		expireIn: number;
	}[];
	configs: {
		configID: string;
		value: number;
	}[];
	controlDESC: string;
};

/* 控制设备 支持批量操作 */
const r = Random;
const mockOpenControlDevice: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/control",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						success: true,
						deviceTypeID: res.filter.deviceTypeID[0],
						deviceTypeName: res.filter.deviceTypeName[0],
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
						result: "控制设备成功",
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
				errmsg: "控制设备失败",
				data: [
					{
						success: false,
						deviceTypeID: res.filter.deviceTypeID[0],
						deviceTypeName: res.filter.deviceTypeName[0],
						deviceID: res.filter.deviceIDs[0],
						deviceName: res.filter.deviceNames[0],
						result: "设备不存在",
					},
				],
			};
		}
	},
};

export default mockOpenControlDevice;
