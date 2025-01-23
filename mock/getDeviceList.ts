import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		deviceTypeIDs: string[];
		deviceIDs: string[];
	};
	order: {
		field: string;
		key: string;
		orderBy: string;
	};
	paging: {
		offset: number;
		size: number;
	};
};

const r = Random;
const mockGetDeviceList: MockMethod = {
	url: "/api/open/deviceManagement/hardware/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				data: {
					paging: {
						nextOffset: 0,
					},
					"results|2-5": [
						{
							deviceTypeID: r.id(),
							deviceID: r.id(),
							info: {
								spaceID: r.integer(1, 100),
								spaceName: r.ctitle(4, 6),
								deviceTypeName: r.ctitle(4, 6),
								deviceName: r.string("lower", 16),
								deviceStatus: r.pick(["online", "offline", "fault"]),
								statusDescription: r.pick(["正常", "离线", "故障"]),
								onlineDuration: r.integer(100000, 1000000),
								onlineTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
								reportDuration: r.integer(100000, 1000000),
								reportTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							},
							"states|4-6": [
								{
									stateID: r.string("upper", 4, 8),
									reported: r.pick([0, 1]),
								},
							],
						},
					],
				},
			});

			let filteredData = mockData.data;

			if (body.filter) {
				if (body.filter.deviceTypeIDs && body.filter.deviceTypeIDs.length > 0) {
					filteredData = filteredData.filter((item: any) =>
						body.filter.deviceTypeIDs.includes(item.deviceTypeID),
					);
				}
				if (body.filter.deviceIDs && body.filter.deviceIDs.length > 0) {
					filteredData = filteredData.filter((item: any) =>
						body.filter.deviceIDs.includes(item.deviceID),
					);
				}
			}

			return {
				code: 0,
				data: filteredData,
			};
		} else {
			return {
				code: 401,
				msg: "无效的 accessToken",
				data: [],
			};
		}
	},
};

export default mockGetDeviceList;
