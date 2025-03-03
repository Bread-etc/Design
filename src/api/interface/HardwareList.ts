/* 公共接口 - 获取硬件列表 */
export interface HardwareListParams {
	accessToken: string;
	fields: string[]; // ["info", "states", "configs"]
	filter: {
		all: boolean;
		hardwareClassifications: string[]; // ["gateway", "terminal"]
		hardwareTypeIDs: string[];
		hardwareTypeNames: string[];
		hardwareIDs: string[];
		hardwareNames: string[];
		hardwareStatus: string[]; // ["online", "offline"]
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
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

interface State {
	stateID: string;
	reported: number;
	desired: number;
}

export interface HardwareListResult {
	data: {
		paging: {
			nextOffset: number;
		};
		results: Array<{
			hardwareTypeID: string;
			hardwareID: string;
			info: {
				spaceID: number;
				spaceName: string;
				hardwareTypeName: string;
				hardwareStatus: "online" | "offline";
				statusDescription: string;
				softwareVersion: string;
				hardwareVersion: string;
				onlineDuration: number;
				onlineTime: string;
				reportDuration: number;
				reportTime: string;
			};
			states: State[];
			configs: State[];
		}>;
	};
}
