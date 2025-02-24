import request from "@/utils/request";
import type {
	RawDataHardwareListParams,
	RawDataHardwareListResult,
} from "@/api/interface/monitor/RawDataHardwareList";

/* 数据分析 - 获取硬件数据列表 */
class RawDataHardwareListService {
	async rawDataHardwareList(params: RawDataHardwareListParams) {
		try {
			const res = await request.post("/iotp/api/open/dataAnalysis/rawData/hardware/list", params);
			if (res.code === 0) {
				return res.data as RawDataHardwareListResult;
			} else {
				throw new Error(res.msg);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default new RawDataHardwareListService();
