import request from "@/utils/request";
import type {
	DeviceSetStatusParams,
	DeviceSetStatusResult,
} from "@/api/interface/device/DeviceSetStatus";
import { useUserStore } from "@/stores/user.store";

/* 设置硬件或设备状态 */
class DeviceSetStatusService {
	async setStatus(params: DeviceSetStatusParams): Promise<DeviceSetStatusResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<DeviceSetStatusResult>(
				`/api/v1/device/setStatus?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceSetStatusService();
