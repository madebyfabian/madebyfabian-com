<template>
	<ClientOnly>
		<iframe frameborder="no" :width="500" :height="250" :src="iframeUrl" />
	</ClientOnly>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, MatomoMatomoOptOutBlock } from '@/types'
	export type RichtextMatomoOptOutProps = RichtextPropsBase<MatomoMatomoOptOutBlock>

	const runtimeConfig = useRuntimeConfig()

	defineProps<{
		attributes: RichtextMatomoOptOutProps['attributes']
		innerBlocks?: RichtextMatomoOptOutProps['innerBlocks']
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
