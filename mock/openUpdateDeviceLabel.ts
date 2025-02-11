import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

type bodyType = {
	accessToken: string;
	filter: {
		labelID: number;
		labelName: string;
		description: string;
	};
};

/* 编辑设备标签 */
const mockOpenUpdateDeviceLabel: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/label/update",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					labelID: res.filter.labelID,
					labelName: res.filter.labelName,
					description: res.filter.description,
				},
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			const mockFailureData = Mock.mock({
				data: {
					labelID: res.filter.labelID,
					labelName: res.filter.labelName,
					description: res.filter.description,
				},
			});

			return {
				code: 2001,
				errmsg: "存在同名的设备标签",
				mockFailureData,
			};
		}
	},
};

export default mockOpenUpdateDeviceLabel;
