/* 获取情景策略列表 */
export interface SceneGetSceneListParams {
	appId: number;
	/*     
        true表示获取空间情景策略列表，
        false表示获取情景任务列表 
    */
	isSpace: boolean;
}

export interface SceneGetSceneListResult {
	success: boolean;
	data: Array<{
		id: number;
		name: string;
		desc: string;
	}>;
}
