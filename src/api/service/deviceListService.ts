import request from "@/utils/request";
import type { GetDeviceListParams } from "../interface/GetDeviceList";

class DeviceListService {
	async getDeviceList(params: GetDeviceListParams) {
		try {
			const res = await request.post("/api/open/deviceManagement/device/list", params);
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

export default new DeviceListService();
