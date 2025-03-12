/* 获取告警日志 */
export interface MonitorGetAlarmLogListParams {
	appId: number;
	alarmRanks: string[];
	spaceId?: number;
	typeIds?: string;
	dealMethod: "UnRead" | "ReadAndUnDeal" | "Deal";
	timeStart: string;
	timeEnd: string;
	current: number;
	rowCount: number;
}

export interface MonitorGetAlarmLogListResult {
	data: {
		current: number;
		rowCount: number;
		rows: Array<{
			alarmContent: string;
			alarmMode: string;
			alarmNotify: string;
			alarmRank: string;
			alarmTime: string;
			alarmType: string;
			alarmWatcher: string;
			appId: number;
			captureId: number;
			deviceId: string;
			deviceName: string;
			isDeal: number;
			isRead: number;
			policyId: number;
			policyName: number;
			pushNums: number;
			rankName: string;
			recorderId: number;
			spaceName: string;
			typeId: string;
			typeName: string;
		}> | null;
		total: number;
	};
	success: boolean;
}
