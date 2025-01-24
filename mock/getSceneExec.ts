import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	scenePolicyID: number;
	spaceID: number;
	spaceRecursive: boolean;
};

/* 执行情景策略 */
const r = Random;
const mockGetSceneExec: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/scene/exec",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				data: {
					scenePolicyID: res.scenePolicyID,
					scenePolicyName: r.cword(1, 6),
					"results|1-4": [
						{
							deviceTypeID: r.string("lower", 30),
							deviceTypeName: r.cword(1, 6),
							"deviceInfos|1-3": [
								{
									success: r.boolean(),
									deviceID: r.string("upper", 2) + r.integer(20),
									deviceName: r.cword(1, 6),
									result: r.pick(["控制设备成功", "控制设备失败"]),
								},
							],
						},
					],
				},
			});

			return mockData;
		} else {
			return {
				code: 1000,
				errmsg: "无效的 accessToken",
				data: {},
			};
		}
	},
};

export default mockGetSceneExec;
