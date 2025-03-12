<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2" style="height: 10%">场景策略</h4>

		<div class="d-flex flex-wrap justify-content-around" style="height: 90%"></div>
	</div>
</template>

<script lang="ts" setup>
import type { SceneExecSceneParams } from "@/api/interface/scene/SceneExecScene";
import type { SceneGetSceneListParams } from "@/api/interface/scene/SceneGetSceneList";
import sceneExecSceneService from "@/api/service/scene/sceneExecSceneService";
import sceneGetSceneListService from "@/api/service/scene/sceneGetSceneListService";
import { onMounted, ref } from "vue";

/*
	1、首先获取情景策略列表，appId = 4
		获取到 sceneId
		里面的 id 就是 sceneId
	2、
*/

/* 变量 */
const sceneList = ref<{ id: number; name: string; desc: string }[]>([]);
const execResult = ref<string[]>([]);

/* 网络请求 */
const fetchSceneList = async (params: SceneGetSceneListParams) => {
	try {
		const res = await sceneGetSceneListService.getSceneList(params);
		sceneList.value = res.data;
	} catch (error) {
		console.error(error);
	}
};

const fetchExec = async (params: SceneExecSceneParams) => {
	try {
		const res = await sceneExecSceneService.execScene(params);
		execResult.value = res.data.map((device) => device.action[0]);
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	/*
		true表示获取空间情景策略列表
		false表示获取情景任务列表
	*/
	await fetchSceneList({
		appId: 4,
		isSpace: true,
	});
});
</script>

<style scoped></style>
