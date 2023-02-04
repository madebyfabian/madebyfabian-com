<template>
	<div class="BgNoise fixed inset-0 z-0" aria-hidden="true">
		<div class="BgNoise-img h-full w-full" />
	</div>
</template>

<script setup lang="ts">
	const { buildCdnUrl } = useMedia()

	const bgSrc = computed(() => {
		const src = buildCdnUrl({
			builderPath: '/wordpress-madebyfabian/',
			relativeUrl: '/wp-content/uploads/2023/02/noise.png',
		})
		return `url("${src}")`
	})
</script>

<style lang="postcss" scoped>
	.BgNoise {
		mask-image: linear-gradient(to bottom, transparent 0%, theme('colors.white') 5%);

		@screen md {
			mask-image: unset;
		}

		.BgNoise-img {
			background-image: v-bind(bgSrc);
			background-repeat: repeat;
		}
	}
</style>
