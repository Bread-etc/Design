import type {
	SceneExecSceneParams,
	SceneExecSceneResult,
} from "@/api/interface/scene/SceneExecScene";
import { useUserStore } from "@/stores/user.store";
import request from "@/utils/request";

/* 执行情景策略 */
class SceneExecSceneService {
	async execScene(params: SceneExecSceneParams): Promise<SceneExecSceneResult> {
		try {
			const accessToken = useUserStore().accessToken;
			const res = await request.post<SceneExecSceneResult>(
				`/api/v1/scene/execScene?access_token=${accessToken}`,
				params,
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default new SceneExecSceneService();
