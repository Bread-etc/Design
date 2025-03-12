import type {
	SceneGetSceneListParams,
	SceneGetSceneListResult,
} from "@/api/interface/scene/SceneGetSceneList";
import { useUserStore } from "@/stores/user.store";
import request from "@/utils/request";

/* 获取情景策略列表 */
class SceneGetSceneListService {
	async getSceneList(params: SceneGetSceneListParams): Promise<SceneGetSceneListResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<SceneGetSceneListResult>(
				`/api/v1/scene/getScene?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new SceneGetSceneListService();
