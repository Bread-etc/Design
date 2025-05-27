import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { showToast } from "@/utils/toast";
import { useUserStore } from "@/stores/user.store";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
			meta: { requiresAuth: true },
			redirect: { name: "device" },
			children: [
				{
					name: "device",
					path: "device",
					component: () => import("../views/subviews/DeviceList.vue"),
				},
				{
					name: "manage",
					path: "manage",
					component: () => import("../views/subviews/DeviceManage.vue"),
				},
				{
					name: "monitor",
					path: "monitor",
					component: () => import("../views/subviews/Monitor.vue"),
				},
				{
					name: "app",
					path: "app",
					component: () => import("../views/subviews/IoTapp.vue"),
				},
				{
					name: "scene",
					path: "scene",
					component: () => import("../views/subviews/SceneStrategy.vue"),
				},
				{
					name: "setting",
					path: "setting",
					component: () => import("../views/subviews/Setting.vue"),
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
	],
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const isLogin = userStore.isAuthenticated;

	if (to.meta.requiresAuth && !isLogin) {
		if (from.name !== "login") {
			showToast("登录失败", "Token已过期", "danger");
		}
		next("/login");
	} else {
		next();
	}
});

export default router;
