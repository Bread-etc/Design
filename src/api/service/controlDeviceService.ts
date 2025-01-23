import request from "@/utils/request";
import type { ControlDeviceParams } from "../interface/ControlDevice";

/* 控制设备 */
class ControlDeviceService {
	async controlDevice(params: ControlDeviceParams) {
		try {
			const res = await request.post("/api/open/deviceManagement/device/control", params);
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

export default new ControlDeviceService();
