import type {
	MonitorGetAlarmLogListParams,
	MonitorGetAlarmLogListResult,
} from "@/api/interface/monitor/MonitorGetAlarmLogList";
import { useUserStore } from "@/stores/user.store";
import request from "@/utils/request";

/* 获取告警日志 */
class MonitorGetAlarmLogListService {
	async getAlarmLogList(
		params: MonitorGetAlarmLogListParams,
	): Promise<MonitorGetAlarmLogListResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<MonitorGetAlarmLogListResult>(
				`/api/v1/alarm/getAlarmLogList?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new MonitorGetAlarmLogListService();
