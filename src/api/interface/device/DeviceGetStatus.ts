/* 获取硬件或设备状态 */
export interface DeviceGetStatusParams {
	[key: string]: {
		all: boolean; // true 的时候忽略下面两个字段
		group_ids: number[];
		device_ids: string[];
	};
}

export interface DeviceGetStatusInner {
	[key: string]: {
		[key: string]: {
			success: boolean;
			app_id: number; // 应用 ID
			app_name: string; // 应用名称
			group_id: number; // 空间分组 ID
			group_name: string; // 空间分组名称
			states: "online" | "offline";
			softVer: string;
			hardVer: string;
			lastTime: string;
			onlineTime: string;
			root_group_id: number; // 设备根空间分组 ID
			root_group_name: string; // 设备根空间分组名称
			name: string; // 设备名称
			data: {
				[key: string]: string | { [key: string]: string }; // 允许属性值为字符串或嵌套对象
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
	/* @ts-ignore */
	success: boolean;
}
