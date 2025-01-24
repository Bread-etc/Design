import request from "@/utils/request";
import type { GetSceneListParams } from "../interface/GetSceneList";

/* 获取情景策略列表 */
class SceneListService {
	async getSceneList(params: GetSceneListParams) {
		try {
			const res = await request.post("/iotp/api/open/policyManagement/platform/scene/list", params);
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

export default new SceneListService();
