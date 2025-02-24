/* 加工任务 */
export interface ProcessingTaskListParams {
	accessToken: string;
	filter: {
		all: boolean;
		taskIDs: number[];
		taskNames: string[];
		taskTypes: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
}

export interface ProcessingTaskListResult {
	data: {
		paging: {
			nextOffset: number;
		};
		results: Array<{
			taskID: number;
			taskName: string;
			taskType: "statistic" | "grading" | "realtime" | "alarm";
			description: string;
			dataSources: {
				dataSource: number;
				deviceTypeID: string;
				stateID: string;
				stateName: string;
			}[];
			dataTypes: {
				dataTypeID: string;
				dataTypeName: string;
				unit: string;
			};
		}>;
	};
}
