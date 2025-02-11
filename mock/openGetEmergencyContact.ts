import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

/* 获取紧急联系人 */
const r = Random;
const mockOpenGetEmergencyContact: MockMethod = {
	url: "/iotp/api/open/policyManagement/platform/cloudGuardian/emergencyContact/get",
	method: "post",
	response: (body: any) => {
		if (body.body.accessToken) {
			return {
				code: 0,
				data: [
					{
						name: r.cname() + "老师",
						phone: r.integer(100000, 10000000000),
					},
				],
			};
		} else {
			return {
				code: 2000,
				errmsg: "获取紧急联系人失败",
				data: {},
			};
		}
	},
};

export default mockOpenGetEmergencyContact;
