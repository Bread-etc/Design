<template>
	<div class="d-flex flex-row vh-100">
		<!-- 左侧表单 -->
		<div class="bg-white d-flex flex-column justify-content-center align-items-center p-5 w-50">
			<h3 class="fw-bold mb-3 user-select-none d-flex align-items-center">
				<IoHardwareChip size="42" class="mt-1 me-2" />物联网实训平台
			</h3>
			<p class="text-muted fw-light user-select-none">欢迎来到物联网实训平台登录页面</p>

			<!-- 登录表单，此处submit的默认事件刷新页面，需要阻止 -->
			<form @submit.prevent="handleLogin" style="width: 60%">
				<div class="form-group mb-3">
					<label for="account" class="form-label text-muted">账号</label>
					<input type="account" id="account" class="form-control" v-model="username" required />
				</div>
				<div class="form-group mb-3">
					<label for="password" class="form-label text-muted">密码</label>
					<div class="input-group">
						<input
							type="password"
							id="password"
							class="form-control"
							v-model="password"
							required
							autocomplete="off"
						/>
					</div>
				</div>

				<button
					type="submit"
					class="mt-3 btn btn-primary w-100 py-2 fw-bold"
					:disabled="!username || !password"
				>
					登录
				</button>
			</form>
		</div>

		<!-- 右侧图片 -->
		<div
			class="user-select-none position-relative d-flex justify-content-center align-items-center w-50 text-white"
			style="background-color: var(--color-main)"
		>
			<img
				src="../assets/images/LoginPic.svg"
				alt="LoginPic"
				class="p-5 img-fluid"
				style="max-width: 80%; height: auto"
			/>
			<div class="text-center position-absolute bottom-0 pb-5">
				<p class="font-monospace fw-bold">Connect with every application.</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { showToast } from "@/utils/toast";
import { IoHardwareChip } from "vue-icons-plus/io";

const userStore = useUserStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const handleLogin = async () => {
	try {
		await userStore.login(username.value, password.value);
		showToast("登录成功", `欢迎回来，${username.value}!`, "success");
		// 登录成功后导航到主页
		router.push({ name: "home" });
	} catch (err) {
		showToast("登录失败", "用户名或密码错误，请重试", "danger");
	}
};
</script>
