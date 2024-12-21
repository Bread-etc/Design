import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import { showToast } from "@/utils/toast";
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
