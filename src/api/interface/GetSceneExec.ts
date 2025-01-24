export interface GetScencExecParams {
	accessToken: string;
	scenePolicyID: number;
	spaceID: number;
	spaceRecursive: boolean;
}

export interface GetScencExecResult {
	scenePolicyID: number;
	scenePolicyName: string;
	results: {
		deviceTypeID: string;
		deviceTypeName: string;
		deviceInfos: {
			success: boolean;
			deviceID: string;
			deviceName: string;
			result: string;
		}[];
	}[];
}
