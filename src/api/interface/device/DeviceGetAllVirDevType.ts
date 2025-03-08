/* 获取设备类型 */
export interface DeviceGetAllVirDevTypeParams {
	appName: string | null;
	current: number;
	rowCount: number;
}

export interface DeviceGetAllVirDevTypeResult {
	success: boolean;
	total: number;
	data: Array<{
		type_id: string;
		type_name: string;
		model: string; // 一般为 virtual
	}>;
}
