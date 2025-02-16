import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	spaceParentID: number;
	spaceName: string;
};

/* 新建空间 */
const r = Random;
const mockSpaceCreate: MockMethod = {
	url: "/iotp/api/open/spaceManagement/space/create",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					spaceID: res.spaceParentID + 1,
					spaceName: res.spaceName,
				},
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 0,
				errMsg: "新建空间失败",
				data: {},
			};
		}
	},
};

export default mockSpaceCreate;
