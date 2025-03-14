/* 设置硬件或设备状态 */
export interface DeviceSetStatusParams {
	[key: string]: {
		// 受控设备 ID
		device_ids: string[];
		data: {
			[key: string]: string;
		};
	};
}

export interface DeviceSetStatusResult {
	[key: string]: {
		[key: string]: {
			// 该类型设备全部设置状态失败返回，提示失败
			desc: string;
		};
		// @ts-ignore
		desc: string;
	};
	// @ts-ignore
	success: boolean;
}
