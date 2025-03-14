/* 获取硬件或设备空间结构 */
export interface DeviceGetGroupParams {
	/* 应用 ID, 为空的时候返回所有应用的空间结构 */
	app_id: number | null;
	type_names: string[];
}
interface ChildNode {
	/* 空间 */
	groupId?: number;
	name?: string;
	path?: string;
	/* 设备 */
	deviceId?: string;
	deviceName?: string;
	typeId?: string;
	id?: string; // 空间 = space_id 硬件 = 设备ID
	typeName?: string;
	/* 公共 */
	leaf: boolean;
	children?: Record<string, ChildNode>;
}
export interface DeviceGetGroupResult {
	success: boolean;
	data: { [key: string]: ChildNode };
}
