/* 公共接口 - 获取硬件类型列表 */
export interface HardwareTypeListParams {
	accessToken: string;
	fields: string[]; // 包含 info states configs
	filter: {
		all: boolean;
		hardwareTypeIDs: string[];
		hardwareTypeName: string[];
		labelNames: string[];
		manufactoryTypes: ["sundray"] | ["thirdparty"];
	};
}

export interface HardwareTypeListResult {
	data: {
		hardwareTypeID: string;
		info: {
			hardwareTypeName: string;
			icon: string;
			description: string;
			model: string;
			manufactory: string;
			accessway: string;
			powerSupplyMode: string;
			labelNames: string[];
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
				  }[]
				| {
						decimal: number;
						range: {
							min: number;
							max: number;
						}[];
				  };
			controllable: boolean;
		}>;
		configs: Array<{
			configID: string;
			configName: string;
			valueType: "int" | "float" | "enum" | "string";
			valueRange: {
				"0": string;
				"1": string;
			};
			controllable: boolean;
		}>;
	}[];
}
