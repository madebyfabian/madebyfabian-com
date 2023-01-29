<template>
	<NuxtLink
		class="UIButton flex-1 md:flex-initial"
		:class="{ 'UIButton-secondary': isSecondary }"
		:to="to"
		:target="props.attributes?.linkTarget"
		:title="props.attributes?.title"
		:rel="props.attributes?.rel"
		:id="id"
		:external="!isInternalLink">
		{{ props.attributes?.text }}
	</NuxtLink>
</template>

<script lang="ts">
	import type { CoreButtonBlock } from '@/types/gen/graphql/graphql'
	import type { InnerBlocksExtended } from '@/types'

	export type RichtextCoreButtonProps = {
		attributes: CoreButtonBlock['attributes']
		innerBlocks?: InnerBlocksExtended
	}

	//
</script>

<script setup lang="ts">
	const runtimeConfig = useRuntimeConfig()
	const siteUrlProd = runtimeConfig.public.siteUrlProd
	const NuxtLink = resolveComponent('NuxtLink')

	const props = defineProps<{
		attributes: RichtextCoreButtonProps['attributes']
		innerBlocks: RichtextCoreButtonProps['innerBlocks']
	}>()

	const isInternalLink = computed(() => {
		const url = props.attributes?.url || ''
		return url.startsWith(siteUrlProd)
	})

	const isSecondary = computed(() => {
		const className = props.attributes?.className || ''
		return className.includes('is-style-outline')
	})

	const to = computed(() => {
		if (!isInternalLink.value) return props.attributes?.url || '#' // external link
		return props.attributes?.url?.replace(siteUrlProd, '') || '#' // internal link
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
