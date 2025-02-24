import request from "@/utils/request";
import type { RawDataDeviceListParams } from "@/api/interface/monitor/RawDataDeviceList";

/* 获取设备数据列表 */
class RawDataDeviceListService {
	async rawDataDeviceList(params: RawDataDeviceListParams) {
		try {
			const res = await request.post("/iotp/api/open/dataAnalysis/rawData/device/list", params);
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

export default new RawDataDeviceListService();
