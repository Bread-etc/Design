import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	contacts: { name: string; phone: string }[];
};

/* 设置紧急联系人 */
const r = Random;
const mockOpenSetEmergencyContact: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/cloudGuardian/emergencyContact/set",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				data: [
					{
						success: true,
						name: r.cname() + "老师",
						phone: r.integer(10000, 10000000000),
						result: "编辑成功",
					},
				],
			});

			return {
				code: 0,
				mockData,
			};
		} else {
			return {
				code: 2001,
				errmsg: "设置紧急联系人失败",
				data: [
					{
						success: true,
						name: r.cname() + "老师",
						phone: r.integer(10000, 10000000000),
						result: "手机号格式错误",
					},
				],
			};
		}
	},
};

export default mockOpenSetEmergencyContact;
