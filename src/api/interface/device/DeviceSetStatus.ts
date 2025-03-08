/* 设置硬件或设备状态 */
export interface DeviceSetStatusParams {
	[key: string]: {
		device_ids: string[]; // 需要控制的设备 ID
		data: {
			[key: string]: string; // 需要设置的该类型设备的值
		};
	};
}

export interface DeviceSetStatusResult {
	[key: string]: {
		[key: string]: {
			desc: string; // 该类型设备全部设置状态失败返回，提示失败
		};
		/* @ts-ignore */
		desc: string;
	};
	/* @ts-ignore */
	success: boolean;
}
