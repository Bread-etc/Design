<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="handleLogin">
			<div>
				<label for="username">Username:</label>
				<input id="username" v-model="username" type="text" />
			</div>
			<div>
				<label for="password">Password:</label>
				<input id="password" v-model="password" type="password" />
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");

const handleLogin = async () => {
	try {
		await userStore.login(username.value, password.value);
		alert("登录成功");
		router.push("/");
	} catch (err) {
		alert("登录失败");
	}
};
</script>

<style scoped></style>
