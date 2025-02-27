import request from "@/utils/request";
import type {
	RawDataDeviceListResult,
	RawDataDeviceListParams,
} from "@/api/interface/monitor/RawDataDeviceList";

/* 数据分析 - 获取设备数据列表 */
class RawDataDeviceListService {
	async rawDataDeviceList(params: RawDataDeviceListParams) {
		try {
			const res = await request.post("/iotp/api/open/dataAnalysis/rawData/device/list", params);
			if (res.code === 0) {
				return res.data as RawDataDeviceListResult;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new RawDataDeviceListService();
