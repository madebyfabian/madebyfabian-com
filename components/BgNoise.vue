<template>
	<div class="BgNoise fixed inset-0 z-0" aria-hidden="true">
		<div class="BgNoise-img h-full w-full" />
	</div>
</template>

<script setup lang="ts">
	import { joinURL, withHttps } from 'ufo'

	const staticPath = '/wp-content/uploads/2023/02/noise.png'

	const runtimeConfig = useRuntimeConfig()
	const bgSrc = computed(() => {
		const src = withHttps(joinURL(runtimeConfig.public.wpHost, staticPath))
		return `url("${src}")`
	})
</script>

<style lang="postcss" scoped>
	.BgNoise {
		mask-image: linear-gradient(360deg, transparent 0%, theme('colors.white') 10%);

		@screen md {
			mask-image: unset;
		}

		.BgNoise-img {
			background-image: v-bind(bgSrc);
			background-repeat: repeat;
		}
	}
</style>
