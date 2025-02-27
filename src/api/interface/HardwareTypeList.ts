/* 公共接口 - 获取硬件类型列表 */
export interface HardwareTypeListParams {
	accessToken: string;
	fields: string[]; // 包含 info states configs
	filter: {
		all: boolean;
		hardwareTypeIDs: string[];
		hardwareTypeName: string[];
		labelName: string[];
		manufactoryTypes: string[];
	};
}
