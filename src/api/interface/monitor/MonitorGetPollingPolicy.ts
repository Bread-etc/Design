/* 获取巡检策略列表 */
export interface MonitorGetPollingPolicyParams {
	appId: number;
	isSpace: boolean;
}

export interface MonitorGetPollingPolicyResult {
	data: Array<{
		description: string;
		id: number;
		name: string;
	}>;
}
