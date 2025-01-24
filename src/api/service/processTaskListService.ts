import request from "@/utils/request";
import type { GetProcessTaskListParams } from "../interface/GetProcessTaskList";

/* 获取任务列表 */
class ProcessTaskListService {
	async getProcessTaskList(params: GetProcessTaskListParams) {
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
