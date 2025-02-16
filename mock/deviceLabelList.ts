import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		labelIDs: number[];
	};
	labelNames: string[];
};

/* 获取设备标签列表 */
const r = Random;
const mockDeviceLabelList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/label/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						labelID: r.integer(0, 10),
						labelName: "设备标签",
						descripition: r.csentence(1, 2),
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
				errmsg: "获取设备标签列表失败",
				data: {},
			};
		}
	},
};

export default mockDeviceLabelList;
