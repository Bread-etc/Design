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
const mockSceneExec: MockMethod = {
	url: "/iotp/api/open/policyMangement/platform/scene/exec",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: {
					scenePolicyID: res.scenePolicyID,
					scenePolicyName: "情景策略",
					"results|1-3": [
						{
							deviceTypeID: r.string("lower", 30),
							deviceTypeName: r.cword(4, 6),
							deviceInfos: [
								{
									success: true,
									deviceID: r.id(),
									deviceName: "插座",
									result: "控制设备成功",
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
				errmsg: "执行情景策略失败",
				data: {},
			};
		}
	},
};

export default mockSceneExec;
