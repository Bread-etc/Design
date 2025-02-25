import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const { Random } = Mock;

// 请求体结构
type bodyType = {
	accessToken: string;
	filter: {
		hardwareTypeID: string;
		hardwareIDs: string[];
		hardwareNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number | null;
		sinceID: number | null;
		count: number | null;
	};
};

// 定义 StatePower 和 StateValue 结构
interface StatePower {
	POWERS_1: string;
	VOLTAGE_1: number;
}

interface StateValue {
	stateID: string;
	value: number;
}

/* 获取硬件数据列表 */
const mockRawDataHardwareList: MockMethod = {
	url: "/iotp/api/open/dataAnalysis/rawData/hardware/list",
	method: "post",
	response: (body: any) => {
		const res: bodyType = body.body;
		if (res.accessToken) {
			let dataID = 1;

			const mockData = Mock.mock({
				data: {
					positioning: {
						left: Random.integer(0, 30),
					},
					"results|8-15": [
						() => {
							const hardwareTypeID =
								res.filter.hardwareTypeID || "HARDWARE_" + Random.string("lower", 6);
							const hardwareID = res.filter.hardwareIDs[0] || `GBK${Random.integer(1000, 9999)}`;
							const time = Random.datetime("yyyy-MM-dd HH:mm:ss");

							// 随机决定 `states` 是对象（StatePower）还是数组（StateValue[]）
							const isStateArray = Random.boolean();

							const states: StatePower | StateValue[] = isStateArray
								? // 生成多个 `StateValue`
									Array.from({ length: Random.integer(1, 4) }).map(() => ({
										stateID: Random.string("upper", 8),
										value: Random.integer(200, 350),
									}))
								: // 生成 `StatePower`
									{
										POWERS_1: Random.string("upper", 6),
										VOLTAGE_1: Random.integer(200, 350),
									};

							return {
								dataID: dataID++,
								hardwareTypeID,
								hardwareID,
								time,
								states,
							};
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
				code: 2000,
				errmsg: "获取硬件数据列表失败",
				data: {},
			};
		}
	},
};

export default mockRawDataHardwareList;
