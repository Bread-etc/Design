/* 硬件数据列表 */
export interface RawDataHardwareListParams {
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
}

interface StatePower {
	POWERS_1: string;
	VOLTAGE_1: number;
}

interface StateValue {
	stateID: string;
	value: number;
}

export interface RawDataHardwareListResult {
	data: {
		positioning: {
			left: number;
		};
		results: Array<{
			dataID: number;
			hardwareTypeID: string;
			hardwareID: string;
			time: string;
			states: StatePower | StateValue[];
		}>;
	};
}
