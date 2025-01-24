import request from "@/utils/request";
import type { GetScencExecParams } from "../interface/GetSceneExec";

/* 执行情景策略 */
class SceneExecService {
	async getSceneExec(params: GetScencExecParams) {
		try {
			const res = await request.post("/iotp/api/open/policyManagement/platform/scene/exec", params);
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

export default new SceneExecService();
