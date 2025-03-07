/* 获取硬件或设备空间结构 */
export interface DeviceGetGroupParams {
	/* 应用 ID, 为空的时候返回所有应用的空间结构 */
	app_id: number | null;
	type_names: string[];
}

// 定义子节点对象的接口
interface ChildNode {
	/* 空间 */
	groupId?: number;
	name?: string;
	path?: string;
	/* 设备 */
	deviceId?: string;
	deviceName?: string;
	typeId?: string;
	id?: string; // 为空间则是 space_id 为硬件则是 设备ID
	typeName?: string;
	/* 公共 */
	leaf: boolean; // 是否为叶子节点，若为设备则为true
	children?: Record<string, ChildNode>;
}

// 定义 data 对象的接口
interface ResponseData {
	[key: string]: ChildNode;
}

// 定义整个响应的接口
export interface DeviceGetGroupResult {
	success: boolean;
	data: ResponseData;
}
