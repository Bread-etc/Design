/* 根据标签获取硬件类型 */
export interface DeviceGetAllDevTypeParams {
	// null -> 返回所有类型
	tag: string[] | null;
	current: number;
	rowCount: number;
}

export interface DeviceGetAllDevTypeResult {
	success: boolean;
	total: number;
	data: Array<{
		// 硬件类型 ID
		type_id: string;
		// 类型中文名称 - 展示
		type_name: string;
		// 硬件类型所包含的硬件型号
		model: string;
	}>;
}
