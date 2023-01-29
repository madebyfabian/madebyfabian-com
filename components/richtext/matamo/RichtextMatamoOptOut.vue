<template>
	<ClientOnly>
		<iframe frameborder="no" :width="500" :height="250" :src="iframeUrl"> </iframe>
	</ClientOnly>
</template>

<script setup lang="ts">
	import type { MatomoMatomoOptOutBlock } from '@/types/gen/graphql/graphql'
	const runtimeConfig = useRuntimeConfig()

	const props = defineProps<{
		attributes: MatomoMatomoOptOutBlock['attributes']
		innerBlocks: MatomoMatomoOptOutBlock['innerBlocks']
	}>()

	const iframeUrl = computed(() => {
		const url = new URL('/wp-content/plugins/matomo/app/index.php', `https://${runtimeConfig.wpHost}`)
		url.searchParams.append('module', 'CoreAdminHome')
		url.searchParams.append('action', 'optOut')
		url.searchParams.append('fontColor', '374151')
		url.searchParams.append('fontFamily', 'sans-serif')
		return url.toString()
	})
</script>
