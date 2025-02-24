import request from "@/utils/request";
import type { ProcessedDataDeviceParams } from "@/api/interface/monitor/processedDataDevice";

/* 获取设备加工数据列表 */
class ProcessedDataDeviceService {
	async processedDataDevice(params: ProcessedDataDeviceParams) {
		try {
			const res = await request.post(
				"/iotp/api/open/dataAnalysis/processedData/device/list",
				params,
			);
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

export default new ProcessedDataDeviceService();
