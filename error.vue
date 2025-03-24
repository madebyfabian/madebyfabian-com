<script setup lang="ts">
	import type { NuxtError } from '#app'

	const props = defineProps({
		error: Object as () => NuxtError,
	})

	const errorCode = computed(() => {
		return props.error?.statusCode ?? 404
	})

	onMounted(() => {
		console.log(props.error)
		useTrackEvent(String(errorCode.value), {
			props: {
				path: document.location.pathname,
			},
		})
	})
</script>

<template>
	<div>
		<h2>Error</h2>
		<p>Page Not Found or other unknown error</p>
	</div>
</template>
