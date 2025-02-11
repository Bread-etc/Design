import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		spaceIDs: number[];
	};
};

/* 删除空间 */
const r = Random;
const mockSpaceDelete: MockMethod = {
	url: "/iotp/api/open/spaceManagement/space/delete",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		const mockData = Mock.mock({
			data: {
				success: true,
				spaceID: res.filter.spaceIDs[0],
				spaceName: r.cword(2, 4),
				result: "删除空间成功",
			},
		});

		if (res.accessToken) {
			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2001,
				errmsg: "删除空间失败",
				data: {
					success: false,
					spaceID: res.filter.spaceIDs[0],
					spaceName: r.cword(2, 4),
					result: "空间下存在硬件或设备",
				},
			};
		}
	},
};

export default mockSpaceDelete;
