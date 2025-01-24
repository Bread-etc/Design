export interface GetProcessTaskListParams {
	accessToken: string;
	filter: {
		all: boolean;
	};
	paging: {
		offset: number;
		size: number;
	};
}

/* data 中多个任务 */
export interface GetProcessTaskListResult {
	paging: {
		nextOffset: number;
	};
	result: {
		taskID: number;
		taskName: string;
		taskType: string;
		description: string;
		state: string;
		dataTypes: {
			dataTypeID: string;
			dataTypeName: string;
			unit: string;
		}[];
		dataSources: {
			dataSourceID: string;
			deviceID: string;
			deviceTypeName: string;
			stateID: string;
			stateName: string;
		}[];
	};
}
