/* 设备数据列表 */
export interface RawDataDeviceListParams {
	accessToken: string;
	filter: {
		deviceTypeID: string;
		deviceIDs: string[];
		deviceNames: string[];
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
}

interface StateValue {
	stateID: string;
	value: number;
}

export interface RawDataDeviceListResult {
	data: {
		positioning: {
			left: number;
		};
		results: Array<{
			dataID: number;
			deviceTypeID: string;
			deviceID: string;
			time: string;
			states: StateValue[];
		}>;
	};
}
