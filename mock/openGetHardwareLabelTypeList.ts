import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
};

/* 获取硬件类型标签列表 */
const r = Random;
const mockOpenGetHardwareLabelTypeList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/label/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-5": [
					{
						labelName: r.cword(1, 5),
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 1000,
				errMsg: "获取硬件类型标签列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetHardwareLabelTypeList;
