import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	withAbnormalList: boolean;
	filter: {
		all: boolean;
		timeStart: string;
		timeEnd: string;
		dateObjectIDs: number[];
		timeObjectIDs: number[];
		inspectionIDs: number[];
		inpectionNames: string[];
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
};

/* 用于获取巡检列表 */
const r = Random;
const mockInspectionListEvent: MockMethod = {
	url: "/iotp/api/open/eventManagement/inspection/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					positioning: {
						left: r.integer(0, 100),
					},
					"results|1-3": [
						{
							inspectionID: res.filter.inspectionIDs[0],
							inspectionName: res.filter.inpectionNames[0],
							inspectionTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
							deviceInfos: [
								{
									deviceTypeID: r.string("lower", 30),
									deviceTypeName: r.cword(4, 6),
									normalCount: r.integer(0, 5),
									abnormalCount: r.integer(0, 5),
									abnormalList: [
										{
											deviceID: r.string("upper", 4) + r.integer(0, 10000000),
											deviceName: r.cword(4, 6),
											result: "设备离线",
										},
									],
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
				code: 2001,
				errmsg: "获取巡检列表失败",
				data: {},
			};
		}
	},
};

export default mockInspectionListEvent;
