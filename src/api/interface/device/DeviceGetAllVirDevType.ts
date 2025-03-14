/* 获取设备类型 */
export interface DeviceGetAllVirDevTypeParams {
	// 应用名称
	appName: string | null;
	current: number;
	rowCount: number;
}

export interface DeviceGetAllVirDevTypeResult {
	success: boolean;
	total: number;
	data: Array<{
		// 硬件类型 ID
		type_id: string;
		// 类型中文名称 - 展示
		type_name: string;
		// 设备标记
		model: string;
	}>;
}
