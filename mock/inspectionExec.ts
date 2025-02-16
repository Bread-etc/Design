import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	inspectionPolicyID: number;
	spaceID: number;
	spaceRecursive: boolean;
};

/* 执行巡检策略 */
const r = Random;
const mockInspectionExec: MockMethod = {
	url: "/iotp/api/open/policyMangement/platform/inspection/exec",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					inspectionID: r.integer(0, 10),
					inspectionTime: r.datetime("yyyy-MM-dd HH:mm:ss"),
					deviceInfos: [
						{
							deviceTypeID: r.string("lower", 30),
							deviceTypeName: "空调面板",
							normalCount: r.integer(0, 10),
							abnormalCount: r.integer(0, 5),
							"abnormalList|abnormalCount": [
								{
									deviceID: r.string("upper", 14),
									deviceName: "空调面板",
									result: "设备离线",
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
				errmsg: "执行巡检策略失败",
				data: {},
			};
		}
	},
};

export default mockInspectionExec;
