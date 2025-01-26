import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		spaceIDs: number[];
	};
	spaceName: string;
};

/* 重命名空间 */
const r = Random;
const mockRenameSpace: MockMethod = {
	url: "/iotp/api/open/spaceManagement/space/rename",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		const mockData = res.filter.spaceIDs.map((spaceID) => {
			return {
				success: true,
				spaceID,
				spaceName: res.spaceName || `空间${spaceID}`,
				result: "重命名成功",
			};
		});

		if (res.accessToken) {
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
						spaceID: res.filter.spaceIDs,
						spaceName: res.spaceName,
						result: "存在另一个同名的空间",
					},
				],
			};
		}
	},
};

export default mockRenameSpace;
