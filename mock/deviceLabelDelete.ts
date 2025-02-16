import { MockMethod } from "vite-plugin-mock";

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
};

/* 删除设备标签 */
const mockDeviceLabelDelete: MockMethod = {
	url: "/iotp/api/open/deviceManagement/device/label/delete",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			return {
				code: 0,
				data: [
					{
						success: true,
						labelID: res.filter.labelIDs[0],
						labelNames: res.filter.labelNames[0],
						description: "设备标签",
						result: "删除成功",
					},
				],
			};
		} else {
			return {
				code: 0,
				errmsg: "删除设备失败",
				data: [
					{
						success: false,
						labelID: res.filter.labelIDs[0],
						labelNames: res.filter.labelNames[0],
						description: "设备标签",
						result: "设备标签正在被使用",
					},
				],
			};
		}
	},
};

export default mockDeviceLabelDelete;
