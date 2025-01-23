import request from "@/utils/request";
import type { GetDeviceTypeParams } from "../interface/GetDeviceType";

/* 获取设备类型 */
class DeviceTypeService {
	async getDeviceTypeList(params: GetDeviceTypeParams) {
		try {
			const res = await request.post("/api/open/deviceManagement/device/type/list", params);
			if (res.code === 0) {
				return res.data;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new DeviceTypeService();
