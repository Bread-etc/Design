/* 执行情景策略 */
export interface SceneExecSceneParams {
	appId: number;
	sceneId: number;
	isSpace: boolean;
	spaceId: number;
	isRecur: boolean;
}

export interface SceneExecSceneResult {
	data: Array<{
		// 总体结果
		Msg: string;
		// 情景策略动作
		action: string[];
		// 操作范围
		choose_dev: string[];
		// 操作的设备类型名称
		dev_type_name: string;
		// 设备字段：动作
		raw_result: Map<string, string>;
		results: Array<{
			deviceID: string;
			name: string;
			reasons: string;
			success: boolean;
			typeID: string;
		}>;
		// 设备类型 ID
		type_id: string;
	}>;
	success: boolean;
}
