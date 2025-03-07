import request from "@/utils/request";
import type {
	DeviceGetGroupParams,
	DeviceGetGroupResult,
} from "@/api/interface/device/DeviceGetGroup";
import { useUserStore } from "@/stores/user.store";

/* 获取硬件或设备空间结构 */
class DeviceGetGroupService {
	async getDeviceGroup(params: DeviceGetGroupParams): Promise<DeviceGetGroupResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<DeviceGetGroupResult>(
				`/api/v1/device/getGroup?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceGetGroupService();
