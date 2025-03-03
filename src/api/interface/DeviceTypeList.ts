/* 公共接口 - 获取设备类型列表 */
export interface DeviceTypeListParams {
	accessToken: string;
	fields: string[]; // 包含 info, states
	filter: {
		all: boolean;
		deviceTypeIDs: string[];
		deviceTypeNames: string[];
		deviceClassification: string[];
	};
}

export interface DeviceTypeListResult {
	data: Array<{
		deviceTypeID: string;
		info: {
			deviceClassification: string;
			deviceTypeName: string;
			icon: string;
			description: string;
		};
		states: Array<{
			stateID: string;
			stateName: string;
			unit: string;
			valueType: "int" | "float" | "enum" | "string";
			valueRange:
				| {
						min: number;
						max: number;
						decimal?: number;
				  }
				| {
						regexp: string;
				  }
				| {
						"0": string;
						"1": string;
				  };
			controllable: boolean;
		}>;
	}>;
}
