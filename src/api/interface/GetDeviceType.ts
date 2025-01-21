export interface GetDeviceTypeParams {
	accessToken: string;
	filter: {
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceClassification: string[];
	};
}

/* data 中多个设备类型 */
export interface GetDeviceTypeResult {
	deviceTypeID: string;
	info: {
		deviceTypeName: string;
		icon: string;
		description: string;
		deviceClassification: string;
	};
	states: {
		stateID: string;
		stateName: string;
		valueType: string;
		valueRange: {
			[key: string]: string;
		};
		controllable: boolean;
	}[];
}
[];
