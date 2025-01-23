import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeID: string;
		deviceIDs: string[];
	};
	states: {
		stateID: string;
		value: number;
		expireln: number;
	};
	config: string[];
	controlDESC: string;
};

const r = Random;
const mockControlDevice: MockMethod = {
	url: "/api/open/deviceManagement/device/control",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				"data|1-4": [
					{
						success: true,
						deviceTypeID: r.id(),
						deviceTypeName: r.ctitle(4, 6),
						deviceID: r.id(),
						deviceName: r.string("lower", 16),
						result: "成功",
					},
				],
			});

			let filteredData = mockData.data;

			if (body.filter) {
				if (body.filter.all) {
					filteredData = mockData.data;
				} else {
					if (body.filter.deviceTypeID && body.filter.deviceTypeID.length > 0) {
						filteredData = filteredData.filter((item: any) => {
							body.filter.deviceTypeID.includes(item.deviceTypeID);
						});
					}
					if (body.filter.deviceIDs && body.filter.deviceIDs.length > 0) {
						filteredData = filteredData.filter((item: any) => {
							body.filter.deviceIDs.includes(item.deviceID);
						});
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
		}
	},
};

export default mockControlDevice;
