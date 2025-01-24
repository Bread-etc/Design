export interface GetRawDataDeviceListParams {
	accessToken: string;
	filter: {
		deviceTypeID: string[];
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		count: number;
	};
}

export interface GetRawDataDeviceListResult {
	positioning: {
		left: number;
	};
	result: {
		dataID: number;
		deviceTypeID: string;
		deviceID: string;
		time: string;
		states: {
			stateID: string;
			value: number;
		}[];
	}[];
}
