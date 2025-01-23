export interface GetDeviceListParams {
	accessToken: string;
	filter: {
		deviceTypeIDs: string[];
		deviceIDs: string[];
	};
	order: {
		field: string;
		key: string;
		orderBy: string;
	};
	paging: {
		offset: number;
		size: number;
	};
}

/* data 中多个设备状态|列表 */
export interface GetDeviceListResult {
	paging: {
		nextOffset: number;
	};
	results: {
		deviceTypeID: string;
		deviceID: string;
		info: {
			spaceID: number;
			spaceName: string;
			deviceTypeName: string;
			deviceName: string;
			deviceStatus: string;
			statusDescription: string;
			onlineDuration: number;
			onlineTime: string;
			reportDuration: number;
			reportTime: string;
		};
		states: {
			stateID: string;
			reported: number;
		}[];
	}[];
}
