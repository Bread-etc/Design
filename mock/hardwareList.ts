import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	fields: string[];
	filter: {
		all: boolean;
		hardwareClassifications: string[];
		hardwareTypeIDs: string[];
		hardwareTypeNames: string[];
		hardwareIDs: string[];
		hardwareNames: string[];
		hardwareStatus: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
	};
	order: {
		field: string;
		key: string;
		orderBy: "asc" | "desc";
	};
	paging: {
		offset: number | null;
		size: number | null;
	};
};

/* 获取硬件列表 */
const mockHardwareList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					paging: {
						nextOffset: Random.integer(0, 2),
					},
					"results|2-5": [
						{
							hardwareTypeID: () => Random.string("lower", 30),
							hardwareID: () => Random.id(),
							info: {
								spaceID: () => Random.integer(1000, 9999),
								spaceName: () => Random.cword(4, 6),
								hardwareTypeName: () => Random.cword(4, 6),
								hardwareStatus: () => Random.pick(["online", "offline"]),
								statusDescription: () => Random.pick(["在线", "离线"]),
								softwareVersion: () => "SOFTWARE_VERSION_" + Random.string("upper", 4),
								hardwareVersion: () => "HARDWARE_VERSION_" + Random.string("upper", 4),
								onlineDuration: () => Random.integer(100000, 1000000),
								onlineTime: () => Random.datetime("yyyy-MM-dd HH:mm:ss"),
								reportDuration: () => Random.integer(100000, 1000000),
								reportTime: () => Random.datetime("yyyy-MM-dd HH:mm:ss"),
							},
							"states|1-4": [
								{
									stateID: () => Random.id(),
									reported: () => Random.integer(0, 10),
									desired: 0,
								},
							],
							"configs|1-3": [
								{
									configID: () => Random.id(),
									reported: () => Random.integer(0, 10),
									desired: 0,
								},
							],
						},
					],
				},
			});

			return {
				code: 0,
				data: mockData,
			};
		} else {
			return {
				code: 1000,
				errMsg: "获取硬件列表失败",
				data: {},
			};
		}
	},
};

export default mockHardwareList;
