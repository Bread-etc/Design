/* 获取硬件或设备状态 */
export interface DeviceGetStatusParams {
	[key: string]: {
		// true 的时候忽略下面两个字段
		all: boolean;
		group_ids: number[];
		device_ids: string[];
	};
}

export interface DeviceGetStatusInner {
	[key: string]: {
		[key: string]: {
			success: boolean;
			// 应用 ID
			app_id: number;
			// 应用名称
			app_name: string;
			// 空间分组 ID
			group_id: number;
			// 空间分组名称
			group_name: string;
			states: "online" | "offline";
			softVer: string;
			hardVer: string;
			lastTime: string;
			onlineTime: string;
			// 设备根空间分组 ID
			root_group_id: number;
			// 设备根空间分组名称
			root_group_name: string;
			// 设备名称
			name: string;
			data: {
				[key: string]: { [key: string]: string };
				cloud_state: { [key: string]: string };
				sync_state: { [key: string]: string };
			};
		};
	};
}

export interface DeviceGetStatusResult {
	[key: string]: {
		[key: string]: DeviceGetStatusInner;
	};
	// @ts-ignore
	success: boolean;
}
