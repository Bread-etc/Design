import request from "@/utils/request";
import type { DeviceTypeListParams } from "../interface/DeviceTypeList";

/* 公共接口 - 获取设备类型列表 */
class DeviceTypeListService {
	async deviceTypeList(params: DeviceTypeListParams) {
		try {
			const res = await request.post("/iotp/api/open/deviceManagement/device/type/list", params);
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

export default new DeviceTypeListService();
