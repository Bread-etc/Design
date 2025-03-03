/* 公共接口 - 获取设备列表 */
export interface DeviceListParams {
	accessToken: string;
	fields: string[]; // 包含 info, states
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceIDs: string[];
		deviceNames: string[];
		deviceStatus: string[]; // 包含 normal abnormal
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		labelIDs: number[];
		labelNames: string[];
	};
	order: {
		field: "info" | "state";
		key: string;
		orderBy: "asc" | "desc";
	};
	paging: {
		offset: number | null;
		size: number | null;
	};
}

export interface DeviceListResult {
	data: {
		paging: {
			nextOffset: number;
		};
		results: Array<{
			deviceTypeID: string;
			deviceID: string;
			info: {
				spaceID: number;
				spaceName: string;
				deviceTypeName: string;
				deviceName: string;
				deviceStatus: "normal" | "abnormal";
				statusDescription: string;
				onlineDuration: number;
				onlineTime: string;
				reportDuration: number;
				reportTime: string;
				labelID: number;
				labelName: string;
			};
			states: Array<{
				stateID: string;
				reported: number;
				desired: number;
				expireIn: number;
			}>;
		}>;
	};
}
