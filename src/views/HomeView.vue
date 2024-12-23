<template>
	<div class="d-flex vh-100">
		<!-- 左侧导航栏 -->
		<div class="navbar d-flex flex-column p-3">
			<!-- Logo -->
			<div class="d-flex w-100 align-items-center ps-2 pe-2 mb-2">
				<IoCloudOutline size="30" class="me-2" />
				<span class="fs-5 fw-bold font-monospace">Title</span>
			</div>

			<!-- 搜索框 -->
			<div class="mt-2 mb-2">
				<input
					type="text"
					class="form-control"
					placeholder="Quick Filter..."
					v-model="searchQuery"
				/>
			</div>

			<nav class="w-100">
				<ul class="nav flex-column">
					<li
						class="mb-2 mt-2 d-flex align-items-center"
						style="font-size: 1rem; padding: 0%"
						v-for="item in filteredMenu"
						:key="item.name"
					>
						<RouterLink :to="{ name: item.routeName }">
							<div class="d-flex flex-row align-items-center">
								<component :is="item.icon" size="20" class="me-2" /> {{ item.name }}
							</div>
						</RouterLink>
					</li>
				</ul>
			</nav>

			<!-- 用户信息 -->
			<div class="d-flex align-items-center mt-auto">
				<img
					src="https://via.placeholder.com/40"
					alt="User"
					class="rounded-circle me-2"
					style="width: 40px; height: 40px"
				/>
				<div>
					<div class="fw-bold">Jessica Warren</div>
					<div class="text-muted">jwarren@getsojo.com</div>
				</div>
			</div>
		</div>

		<!-- 右侧主要内容 -->
		<div class="d-flex flex-grow-1 p-4" style="background-color: var(--bg-color-dashboard)">
			<!-- 嵌套路由展示 -->
			<KeepAlive>
				<RouterView />
			</KeepAlive>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
	IoCloudOutline,
	IoSettingsOutline,
	IoGridOutline,
	IoBarChartOutline,
	IoApertureOutline,
} from "vue-icons-plus/io";

const searchQuery = ref("");

// 导航菜单数据
const menuItems = ref([
	{ name: "设备列表", routeName: "device", icon: IoBarChartOutline }, // 将图标组件直接作为对象传递
	{ name: "实训应用", routeName: "app", icon: IoGridOutline },
	{ name: "情景策略", routeName: "scene", icon: IoApertureOutline },
	{ name: "设置", routeName: "setting", icon: IoSettingsOutline },
]);

// 筛选后的导航菜单
const filteredMenu = computed(() => {
	if (!searchQuery.value.trim()) {
		return menuItems.value; // 无输入时显示所有菜单
	}
	return menuItems.value.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});
</script>

<style scoped>
.navbar {
	background-color: var(--bg-color-nav);
	width: 18%;
	border-top: none;
	border-bottom: none;
	border-left: none;
	border-right: solid 2px #ebebeb;
}

.active-link {
	font-weight: bold;
	color: var(--color-primary);
}
</style>
