import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	labelName: string;
	description: string;
};

/* 新增设备标签 */
const r = Random;
const mockCreateDeviceLabel: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/label/create",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					labelID: r.integer(0, 10),
					labelName: res.labelName,
					description: res.description,
				},
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 1000,
				errmsg: "新增设备标签失败",
				data: {},
			};
		}
	},
};

export default mockCreateDeviceLabel;
