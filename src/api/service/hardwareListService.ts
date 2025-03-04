import request from "@/utils/request";
import type { HardwareListParams, HardwareListResult } from "../interface/HardwareList";

/* 公共接口 - 获取硬件列表 */
class HardwareListService {
	async hardwareList(params: HardwareListParams) {
		try {
			const res = await request.post("/iotp/api/open/deviceManagement/hardware/list", params);
			if (res.code === 0) {
				return res.data as HardwareListResult;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new HardwareListService();
