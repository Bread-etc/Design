import request from "@/utils/request";
import type { ProcessingTaskListParams } from "@/api/interface/monitor/ProcessingTaskList";

/* 获取加工列表 */
class ProcessTaskListService {
	async processingTaskList(params: ProcessingTaskListParams) {
		try {
			const res = await request.post("/iotp/api/open/dataAnalysis/processingTask/list", params);
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

export default new ProcessTaskListService();
