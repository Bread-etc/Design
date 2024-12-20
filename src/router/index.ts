import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import { useUserStore } from "@/stores/user.store";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: { requiresAuth: true },
		},
		{
			path: "/login",
			name: "login",
			// component: () => import("../views/LoginView.vue"),
			component: LoginView,
		},
	],
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const isAuthenticated = userStore.isAuthenticated;

	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: "login" }); // 未登录时跳转到登录界面
	} else {
		next(); // 放行
	}
});

export default router;
