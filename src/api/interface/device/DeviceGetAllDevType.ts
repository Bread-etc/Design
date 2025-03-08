/* 根据标签获取硬件类型 */
export interface DeviceGetAllDevTypeParams {
	tag: string[] | null; // 为空则返回所有类型
	current: number; // 页码
	rowCount: number; // 每页的记录条数
}

export interface DeviceGetAllDevTypeResult {
	success: boolean;
	total: number;
	data: Array<{
		type_id: string; // 硬件类型 ID
		type_name: string; // 类型中文名称 - 展示
		model: string; // 该硬件类型所包含的硬件型号
	}>;
}
