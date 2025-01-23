export interface ControlDeviceParams {
	accessToken: string;
	filter: {
		all: boolean;
		deviceTypeID: string;
		deviceIDs: string[];
	};
	states: {
		stateID: string;
		value: number;
		expireln: number;
	};
	config: string[];
	controlDESC: string;
}

export interface ControlDeviceResult {
	data: {
		success: boolean;
		deviceTypeID: string;
		deviceTypeName: string;
		deviceID: string;
		deviceName: string;
		result: string;
	}[];
}
