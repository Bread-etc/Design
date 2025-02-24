import request from "@/utils/request";
import type { ProcessedDataSpaceListParams } from "@/api/interface/monitor/ProcessedDataSpaceList";

/* 获取空间加工数据 */
class ProcessedDataSpaceService {
	async processedDataSpace(params: ProcessedDataSpaceListParams) {
		try {
			const res = await request.post(
				"/iotp/api/open/dataAnalysis/processedData/space/list",
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

export default new ProcessedDataSpaceService();
