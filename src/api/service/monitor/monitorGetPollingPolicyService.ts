import type {
	MonitorGetPollingPolicyParams,
	MonitorGetPollingPolicyResult,
} from "@/api/interface/monitor/MonitorGetPollingPolicy";
import { useUserStore } from "@/stores/user.store";
import request from "@/utils/request";

/* 获取巡检策略列表 */
class MonitorGetPollingPolicyService {
	async getPollingPolicy(
		params: MonitorGetPollingPolicyParams,
	): Promise<MonitorGetPollingPolicyResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<MonitorGetPollingPolicyResult>(
				`/api/v1/policy/getPollingPolicy?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new MonitorGetPollingPolicyService();
