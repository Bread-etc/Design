import request from "@/utils/request";
import type {
	DeviceGetAllDevTypeParams,
	DeviceGetAllDevTypeResult,
} from "@/api/interface/device/DeviceGetAllDevType";
import { useUserStore } from "@/stores/user.store";

/* 根据标签获取硬件类型 */
class DeviceGetAllDevTypeService {
	async getAllDevType(params: DeviceGetAllDevTypeParams): Promise<DeviceGetAllDevTypeResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<DeviceGetAllDevTypeResult>(
				`/api/v1/device/getAllDevType?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceGetAllDevTypeService();
