import request from "@/utils/request";
import type {
	DeviceGetAllVirDevTypeParams,
	DeviceGetAllVirDevTypeResult,
} from "@/api/interface/device/DeviceGetAllVirDevType";
import { useUserStore } from "@/stores/user.store";

/* 获取设备类型 */
class DeviceGetAllVirDevTypeService {
	async getAllVirDevType(
		params: DeviceGetAllVirDevTypeParams,
	): Promise<DeviceGetAllVirDevTypeResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<DeviceGetAllVirDevTypeResult>(
				`/api/v1/device/getAllVirDevType?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceGetAllVirDevTypeService();
