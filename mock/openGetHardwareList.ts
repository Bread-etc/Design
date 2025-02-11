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
		orderBy: string;
	};
	paging: {
		offset: number;
		size: number;
	};
};

/* 获取硬件列表 */
const r = Random;
const mockOpenGetHardwareList: MockMethod = {
	url: "/iotp/api/open/deviceManagement/hardware/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				paging: {
					nexOffset: r.integer(0, 2),
				},
				"results|1-5": [
					{
						hardwareTypeID: r.string("lower", 30),
						hardwareID: r.id(),
						info: {
							spaceID: r.integer(1000, 9999),
							spaceName: r.cword(4, 6),
							hardwareTypeName: r.cword(4, 6),
							hardwareStatus: r.pick(["online", "offline"]),
							statusDescription: r.pick(["在线", "离线"]),
							softwareVersion: r.id(),
							hardwareVersion: r.id(),
							onlineDuration: r.integer(100000, 1000000),
							onlineTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							reportDuration: r.integer(100000, 1000000),
							reportTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
						},
						"states|1-4": [
							{
								stateID: r.id(),
								reported: r.integer(0, 10),
								desired: 0,
							},
						],
						"configs|1-3": [
							{
								configID: r.id(),
								reported: r.integer(0, 10),
								desired: 0,
							},
						],
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
				errMsg: "获取硬件列表失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetHardwareList;
