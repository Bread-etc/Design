<template>
	<div class="p-2 w-100">
		<h4 class="fw-bold pb-3 mb-3 border-bottom border-2">场景策略</h4>

		<!-- 空间情景策略 -->
		<div class="mb-2">
			<a-divider style="border-color: var(--color-main)">空间情景策略</a-divider>
			<div class="d-flex gap-5 overflow-x-auto px-2 scene-list">
				<div
					v-for="scene in spaceSceneList"
					:key="scene.id"
					class="p-4 rounded-2 text-center"
					style="background-color: var(--bg-card); width: 18%"
				>
					<img
						src="@/assets/images/scene_icon.png"
						alt="场景图标"
						class="mb-2 rounded-2 p-2"
						style="background-color: var(--color-main)"
					/>
					<p class="fw-bold m-0">{{ scene.name }}</p>
					<p class="mb-2 text-muted" style="font-size: 0.8rem">{{ scene.desc || "暂无描述" }}</p>
					<a-button type="primary" size="small" @click="executeScene(scene, true)">执行</a-button>
				</div>
			</div>
		</div>

		<!-- 情景任务 -->
		<div class="mb-2">
			<a-divider style="border-color: var(--color-main)">情景任务</a-divider>
			<div class="d-flex gap-5 overflow-x-auto px-2 scene-list">
				<div
					v-for="task in sceneTaskList"
					:key="task.id"
					class="p-4 rounded-2 text-center"
					style="background-color: var(--bg-card); width: 18%"
				>
					<img
						src="@/assets/images/scene_icon.png"
						alt="任务图标"
						class="mb-2 rounded-2 p-2"
						style="background-color: var(--color-main)"
					/>
					<p class="fw-bold m-0">{{ task.name }}</p>
					<p class="mb-2 text-muted" style="font-size: 0.8rem">{{ task.desc || "暂无描述" }}</p>
					<a-button type="primary" size="small" @click="executeScene(task, false)">执行</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import sceneExecSceneService from "@/api/service/scene/sceneExecSceneService";
import sceneGetSceneListService from "@/api/service/scene/sceneGetSceneListService";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

// 空间情景策略
const spaceSceneList = ref<{ id: number; name: string; desc: string }[]>([]);
// 情景任务列表
const sceneTaskList = ref<{ id: number; name: string; desc: string }[]>([]);
const execResult = ref<string[]>([]);

/* 网络请求 */
const fetchSceneList = async () => {
	try {
		const res = await sceneGetSceneListService.getSceneList({
			appId: 4,
			isSpace: true,
		});
		const res2 = await sceneGetSceneListService.getSceneList({
			appId: 4,
			isSpace: false,
		});
		spaceSceneList.value = res.data;
		sceneTaskList.value = res2.data;
	} catch (error) {
		console.error(error);
	}
};

const executeScene = async (params: { id: number; name: string }, isSpace: boolean) => {
	try {
		const res = await sceneExecSceneService.execScene({
			appId: 4,
			sceneId: params.id,
			isSpace,
			spaceId: 4,
			isRecur: true,
		});

		// 解析返回结果
		if (res.success && res.data?.length > 0) {
			// 提取所有动作 action
			const actions = res.data.flatMap((item: any) => item.action);
			message.success(`执行成功: ${actions.join("，")}`);
		} else {
			message.error("执行失败");
		}
	} catch (error) {
		message.error("执行失败");
		console.error(error);
	}
};

onMounted(async () => {
	/*
		true表示获取空间情景策略列表
		false表示获取情景任务列表
	*/
	await fetchSceneList();
});
</script>

<style scoped>
/* 横向滚动容器 */
.scene-list {
	white-space: nowrap;
	scrollbar-width: thin; /* 兼容 Firefox */
	scrollbar-color: #ccc transparent; /* 兼容 Firefox */
}

/* Webkit 滚动条美化 */
.scene-list::-webkit-scrollbar {
	height: 6px;
}

.scene-list::-webkit-scrollbar-thumb {
	background: #ccc;
	border-radius: 4px;
}

:deep(.ant-divider-inner-text) {
	color: var(--text-color-main) !important;
}
</style>
