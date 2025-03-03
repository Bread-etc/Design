import request from "@/utils/request";
import type { DeviceListParams } from "../interface/DeviceList";

/* 公共接口 - 获取设备列表 */
class DeviceListService {
	async deviceList(params: DeviceListParams) {
		try {
			const res = await request.post("/iotp/api/open/deviceManagement/device/list", params);
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
