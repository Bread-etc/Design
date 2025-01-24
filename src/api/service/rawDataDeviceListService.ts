import request from "@/utils/request";
import type { GetRawDataDeviceListParams } from "@/api/interface/GetRawDataDeviceList";

/* 获取用户需要设备的原始数据，生成个性化的统计图、趋势图等 */
class RawDataDeviceListService {
	async getRawDataDeviceList(params: GetRawDataDeviceListParams) {
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
