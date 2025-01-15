<template>
	<div class="d-flex vh-100">
		<!-- 左侧导航栏 -->
		<div class="navbar d-flex flex-column p-3">
			<div class="d-flex w-100 align-items-center ps-2 pe-2 mb-2">
				<IoCloudOutline size="30" class="me-2" />
				<span class="fs-5 fw-bold font-monospace user-select-none">Title</span>
			</div>

			<div class="mt-2 mb-2 position-relative">
				<IoSearchOutline
					class="position-absolute"
					size="22"
					style="top: 50%; left: 10px; transform: translateY(-50%); color: var(--text-color-nav)"
				/>
				<input
					type="text"
					class="form-control ps-5"
					placeholder="Quick Filter..."
					v-model="searchQuery"
				/>
			</div>
			<nav class="w-100 p-1">
				<ul class="nav flex-column">
					<li
						v-for="item in filteredMenu"
						:key="item.name"
						class="mb-2 mt-2 d-flex align-items-center"
						style="font-size: 1.1rem; padding: 0%"
					>
						<RouterLink
							:to="{ name: item.routeName }"
							class="nav-link text-decoration-none d-flex align-items-center px-3 py-2 rounded-4"
							:class="{ active: $route.name === item.routeName }"
						>
							<component :is="item.icon" size="20" class="me-2" />
							{{ item.name }}
						</RouterLink>
					</li>
				</ul>
			</nav>

			<div class="d-flex mt-auto w-100">
				<div class="p-1 d-flex align-items-center w-100">
					<IoPersonCircleOutline size="28" style="padding: 0%" />
					<div class="w-75 fw-bold user-select-none text-truncate ms-1">
						{{ username }}
					</div>
					<div
						@click="logout"
						class="d-flex align-items-center justify-content-center"
						style="cursor: pointer"
					>
						<IoChevronForwardOutline size="20" />
					</div>
				</div>
			</div>
		</div>

		<!-- 右侧主要内容 -->
		<div class="d-flex flex-grow-1 p-4" style="background-color: var(--bg-color-dashboard)">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";
import { useModal } from "@/utils/modal";
import { ref, computed, shallowRef } from "vue";
import {
	IoCloudOutline,
	IoSettingsOutline,
	IoGridOutline,
	IoBarChartOutline,
	IoApertureOutline,
	IoSearchOutline,
	IoConstructOutline,
	IoPulseOutline,
	IoPersonCircleOutline,
	IoChevronForwardOutline,
} from "vue-icons-plus/io";

const searchQuery = ref("");
const useStore = useUserStore();
const username: string = useStore.username;
const { showModal } = useModal();

// 导航菜单数据（使用 shallowRef 避免深层响应式）
const menuItems = shallowRef([
	{ name: "设备列表", routeName: "device", icon: IoBarChartOutline },
	{ name: "设备管理", routeName: "manage", icon: IoConstructOutline },
	{ name: "数据监控", routeName: "monitor", icon: IoPulseOutline },
	{ name: "实训应用", routeName: "app", icon: IoGridOutline },
	{ name: "场景策略", routeName: "scene", icon: IoApertureOutline },
	{ name: "设置", routeName: "setting", icon: IoSettingsOutline },
]);

// 筛选后的导航菜单
const filteredMenu = computed(() => {
	if (!searchQuery.value.trim()) {
		return menuItems.value;
	}
	return menuItems.value.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

// 退出登录逻辑
const logout = () => {
	console.log(111);
	showModal({
		title: "是否登出？",
		size: "sm",
		content: "<p>是否确认登出，该操作将会清除用户数据</p>",
		onConfirm: () => {
			console.log("logout");
		},
	});
};
</script>

<style scoped lang="scss">
.navbar {
	background-color: var(--bg-color-nav);
	width: 18%;
	border-top: none;
	border-bottom: none;
	border-left: none;
	border-right: solid 2px #ebebeb;
}

/* 默认文字与图标颜色 */
.nav-link {
	color: var(--text-color-nav);
	transition: all 0.3s ease;
}

/* 鼠标悬停样式 */
.nav-link:hover {
	width: 100%;
	background-color: var(--bg-color-nav-hover);
	color: black;
}

/* 激活状态 */
.nav-link.active {
	width: 100%;
	color: black !important;
	background-color: var(--bg-color-nav-hover);
}

/* 图标颜色动态调整 */
.nav-link.active component {
	color: black;
}
</style>
