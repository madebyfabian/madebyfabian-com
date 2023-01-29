<template>
	<div class="container max-w-3xl">
		<h1 class="text-center mt-8">Oops! Error {{ props.error?.statusCode || 500 }} 🫣</h1>

		<p class="text-xl text-center">{{ props.error?.message || 'An error occured' }}</p>

		<details class="group/details mt-12">
			<summary class="font-bold cursor-pointer p-6 text-lg flex items-center justify-center gap-2">
				<span>Details</span>
				<span class="group-open/details:rotate-180 select-none">⬇️</span>
			</summary>
			<div class="-mt-2 px-6 pb-6">
				<pre>{{ props.error }}</pre>
			</div>
		</details>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		error?: {
			statusCode?: number
			message: string
		}
	}>()
</script>
