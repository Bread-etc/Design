import request from "@/utils/request";
import type {
	DeviceGetStatusParams,
	DeviceGetStatusResult,
} from "@/api/interface/device/DeviceGetStatus";
import { useUserStore } from "@/stores/user.store";

/* 获取硬件或设备状态 */
class DeviceGetStatusService {
	async getStatus(params: DeviceGetStatusParams): Promise<DeviceGetStatusResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<DeviceGetStatusResult>(
				`/api/v1/device/getStatus?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceGetStatusService();
