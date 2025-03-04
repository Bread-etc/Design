import request from "@/utils/request";
import type { HardwareTypeListParams, HardwareTypeListResult } from "../interface/HardwareTypeList";

/* 公共接口 - 获取硬件类型列表 */
class HardwareTypeListService {
	async hardwareTypeList(params: HardwareTypeListParams) {
		try {
			const res = await request.post("/iotp/api/open/deviceManagement/hardware/type/list", params);
			if (res.code === 0) {
				return res.data as HardwareTypeListResult;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new HardwareTypeListService();
