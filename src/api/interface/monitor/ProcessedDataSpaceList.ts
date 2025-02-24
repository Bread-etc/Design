/* 获取空间加工数据 */
export interface ProcessedDataSpaceListParams {
	accessToken: string;
	dataTypeIDs: string[];
	filter: {
		taskID: number;
		dataSourceID: number;
		aggregation: "5minute" | "hour" | "day" | "month";
		spaceIDs: number[];
		spaceNames: string[];
		spaceRecursive: boolean;
		timeStart: string;
		timeEnd: string;
	};
	positioning: {
		maxID: number;
		sinceID: number;
		count: number;
	};
}

export interface ProcessedDataSpaceListResult {
	data: {
		positioning: {
			left: number;
		};
		results: Array<{
			dataID: number;
			spaceID: number;
			time: string;
			fields: {
				dataTypeID: "max" | "min";
				value: number;
			}[];
		}>;
	};
}
