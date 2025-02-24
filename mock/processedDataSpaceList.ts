import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	dataTypeIDs: string[];
	filter: {
		taskID: number;
		dataSourceID: number;
		aggregation: string;
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 获取空间加工数据列表 */
const r = Random;
const mockProcessedDataSpaceList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/processedData/space/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 30),
					},
					"results|1-5": [
						{
							dataID: r.integer(0, 10),
							spaceID: res.filter.spaceIDs[0],
							time: r.datetime("yyyy-MM-dd HH:mm:ss"),
							fields: [
								{
									dataTypeID: "max",
									value: r.integer(220, 330),
								},
								{
									dataTypeID: "min",
									value: r.integer(220, 330),
								},
							],
						},
					],
				},
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2000,
				errmsg: "获取空间加工数据列表失败",
				data: {},
			};
		}
	},
};

export default mockProcessedDataSpaceList;
