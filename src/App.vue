<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<div id="container">
		<RouterView />
	</div>
</template>

<style scoped lang="css">
#container {
	min-width: 100vw;
	min-height: 100vh;
}
</style>
