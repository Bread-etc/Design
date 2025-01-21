<template>
	<div class="d-flex vh-100">
		<!-- 左侧导航栏 -->
		<div class="navbar d-flex flex-column p-3">
			<div class="d-flex w-100 align-items-center ps-2 pe-2 pb-2 mb-2 border-bottom border-2">
				<span class="fs-5 fw-bold font-monospace user-select-none">Iot Platform</span>
			</div>

			<div class="mt-2 mb-2 position-relative w-100">
				<IoSearchOutline
					class="position-absolute"
					size="22"
					style="top: 50%; left: 10px; transform: translateY(-50%)"
				/>
				<input
					type="text"
					class="form-control ps-5"
					placeholder="快速查找..."
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
							class="nav-link w-100 text-decoration-none d-flex align-items-center px-3 py-2 rounded-4"
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
						<IoLogOutOutline size="20" />
					</div>
				</div>
			</div>

			<!-- 使用模态框组件 -->
			<ModalComponent
				v-model:visible="isModalVisible"
				title="是否登出？"
				size="sm"
				:onConfirm="handleConfirm"
			>
				<p>该操作将会清除用户数据！</p>
			</ModalComponent>
		</div>

		<!-- 右侧主要内容 -->
		<div class="d-flex flex-grow-1 p-4" style="background-color: var(--bg-main)">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";
import { ref, computed, shallowRef } from "vue";
import { useRouter } from "vue-router";
import ModalComponent from "@/components/ModalComponent.vue";
import {
	IoSettingsOutline,
	IoGridOutline,
	IoBarChartOutline,
	IoApertureOutline,
	IoSearchOutline,
	IoConstructOutline,
	IoPulseOutline,
	IoPersonCircleOutline,
	IoLogOutOutline,
} from "vue-icons-plus/io";

const searchQuery = ref("");
const useStore = useUserStore();
const username: string = useStore.username;
const router = useRouter();

const isModalVisible = ref(false); // 控制模态框显示

// 导航菜单数据（使用 shallowRef 避免深层响应式）
const menuItems = shallowRef([
	{ name: "设备列表", routeName: "device", icon: IoBarChartOutline },
	{ name: "设备管理", routeName: "manage", icon: IoConstructOutline },
	{ name: "数据监控", routeName: "monitor", icon: IoPulseOutline },
	{ name: "实训应用", routeName: "app", icon: IoGridOutline },
	{ name: "场景策略", routeName: "scene", icon: IoApertureOutline },
	{ name: "设置", routeName: "setting", icon: IoSettingsOutline },
]);

const menuItemsForStudent = shallowRef([
	{ name: "设备列表", routeName: "device", icon: IoBarChartOutline },
	{ name: "设备管理", routeName: "manage", icon: IoConstructOutline },
	{ name: "数据监控", routeName: "monitor", icon: IoPulseOutline },
	{ name: "实训应用", routeName: "app", icon: IoGridOutline },
	{ name: "设置", routeName: "setting", icon: IoSettingsOutline },
]);

const role: string = useStore.role!;
// 筛选后的导航菜单
const filteredMenu = computed(() => {
	if (role === "admin") {
		if (!searchQuery.value.trim()) {
			return menuItems.value;
		} else {
			return menuItems.value.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
			);
		}
	} else {
		if (!searchQuery.value.trim()) {
			return menuItemsForStudent.value;
		} else {
			return menuItemsForStudent.value.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
			);
		}
	}
});

// 确认登出逻辑
const handleConfirm = () => {
	useStore.logout();
	router.push({ name: "login" });
	isModalVisible.value = false;
};

const logout = () => {
	isModalVisible.value = true;
};
</script>

<style scoped lang="css">
.navbar {
	background-color: var(--bg-color-nav);
	width: 18%;
	border-top: none;
	border-bottom: none;
	border-left: none;
	border-right: solid 2px var(--bg-color-nav-hover);
}

/* 默认文字与图标颜色 */
.nav-link {
	transition: all 0.3s ease;
	color: var(--text-color-nav);
}

/* 鼠标悬停样式 */
.nav-link:hover {
	width: 100%;
	background-color: var(--bg-color-nav-hover);
	color: var(--text-color-nav-hover);
}

/* 激活状态 */
.nav-link.active {
	width: 100%;
	color: var(--text-color-nav-hover) !important;
	background-color: var(--bg-color-nav-hover);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
