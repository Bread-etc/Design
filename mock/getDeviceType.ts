import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

type bodyType = {
	accessToken: string;
	filter: {
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceClassification: string[];
	};
};

const mockGetDeviceType: MockMethod = {
	url: "/api/open/deviceManagement/device/type/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			const mockData = Mock.mock({
				code: 0,
				"data|5": [
					{
						deviceTypeID: "@id",
						info: {
							deviceTypeName: "@ctitle(3, 5)",
							icon: "@image('200x100', '#4A7BF7', 'Hello')",
							description: "@csentence(10, 20)",
							deviceClassification: "@cword(3, 5)",
						},
						"states|2": [
							{
								stateID: "@word(10)",
								stateName: "@cword(3)",
								valueType: "enum",
								valueRange: {
									"0": "关",
									"1": "开",
								},
								controllable: Mock.mock("@boolean"),
							},
						],
					},
				],
			});

			let filteredData = mockData.data;

			if (body.filter) {
				if (body.filter.deviceTypeIDs && body.filter.deviceTypeIDs.length > 0) {
					filteredData = filteredData.filter((item: any) =>
						body.filter.deviceTypeIDs.includes(item.deviceTypeID),
					);
				}
				if (body.filter.deviceTypeNames && body.filter.deviceTypeNames.length > 0) {
					filteredData = filteredData.filter((item: any) =>
						body.filter.deviceTypeNames.some((name: string) =>
							item.info.deviceTypeName.includes(name),
						),
					);
				}
				if (body.filter.deviceClassification && body.filter.deviceClassification.length > 0) {
					filteredData = filteredData.filter((item: any) =>
						body.filter.deviceClassification.some((classification: string) =>
							item.info.deviceClassification.includes(classification),
						),
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

export default mockGetDeviceType;
