/* 获取设备加工数据 */
export interface ProcessedDataDeviceParams {
	accessToken: string;
	dataTypeIDs: number[];
	filter: {
		taskID: number;
		dataSourceID: number;
		aggregation: "5minute" | "hour" | "day" | "month";
		deviceIDs: string[];
		deviceNames: string[];
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: number;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
}

interface FieldData {
	fieldID: "max" | "min";
	value: number;
}

interface DataTypeData {
	dataTypeID: "max" | "min";
	value: number;
}

export interface ProcessedDataDeviceResult {
	data: {
		positioning: {
			left: number;
		};
		results: Array<{
			dataID: number;
			deviceTypeID: string;
			deviceID: string;
			time: string;
			data: (FieldData | DataTypeData)[]; // 使用联合类型
		}>;
	};
}
