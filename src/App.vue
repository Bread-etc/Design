<template>
	<div id="app">
		<input v-model="username" placeholder="用户名" />
		<input v-model="password" placeholder="密码" />
		<button @click="login">登录</button>
		<span v-if="errorMessage">{{ errorMessage }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import authService from "@/api/service/authService";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
	try {
		const result = await authService.login(username.value, password.value);
		console.log("Login Success:", result);
		// 登录成功后可以跳转页面，或存储token等操作
	} catch (error) {
		errorMessage.value = "登录失败，请检查用户名和密码";
		console.error("Login error:", error);
	}
};
</script>
