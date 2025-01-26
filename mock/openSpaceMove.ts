import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		spaceIDs: number[];
	};
	spaceParentID: number;
};

/* 用于移动空间 到指定的 父空间下，支持批量操作 */
const r = Random;
const mockOpenSpaceMove: MockMethod = {
	url: "/iotp/api/open/spaceManagement/space/move",
	method: "post",
	response: (body: any) => {
		const req: bodyType = body.body;
		const mockData = Mock.mock({
			success: true,
			spaceID: req.filter.spaceIDs[0],
			spaceName: r.cword(3, 6),
			result: "移动空间成功",
		});

		if (req.accessToken) {
			return {
				code: 0,
				data: mockData,
			};
		} else {
			return {
				code: 2001,
				data: [
					{
						success: false,
						spaceID: req.filter.spaceIDs[0],
						spaceName: r.cword(3, 6),
						result: "存在另一个同名的空间",
					},
				],
			};
		}
	},
};

export default mockOpenSpaceMove;
