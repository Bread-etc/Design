import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
};

/* 获取空间列表 */
const r = Random;
const mockOpenGetSpaceList: MockMethod = {
	url: "/iotp/api/open/spaceManagement/space/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				"data|1-3": [
					{
						spaceID: r.integer(0, 10),
						spaceParentID: r.integer(0, 10),
						spaceName: r.cword(3, 6),
						spacePath: "/" + r.integer(0, 10),
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
				errMsg: "获取空间列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetSpaceList;
