import request from "@/utils/request";
import type { GetDeviceTypeParams } from "../interface/GetDeviceType";

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
