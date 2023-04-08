<template>
	<NuxtLink v-if="!isHashLink" v-bind="defaultProps" :to="to" :external="!isInternalLink">
		{{ text }}
	</NuxtLink>
	<a v-else v-bind="defaultProps" :href="to">
		{{ text }}
	</a>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreButtonBlock } from '@/types'
	export type RichtextCoreButtonProps = RichtextPropsBase<CoreButtonBlock>

	const runtimeConfig = useRuntimeConfig()
	const siteUrlProd = runtimeConfig.public.siteUrlProd
	const NuxtLink = resolveComponent('NuxtLink')

	const props = defineProps<{
		attributes: RichtextCoreButtonProps['attributes']
		innerBlocks?: RichtextCoreButtonProps['innerBlocks']
	}>()

	const isHashLink = computed(() => {
		const url = props.attributes?.url || ''
		return url.startsWith('#')
	})

	const isInternalLink = computed(() => {
		const url = props.attributes?.url || ''
		const startsWithSiteUrl = url.startsWith(siteUrlProd)
		return startsWithSiteUrl || isHashLink.value
	})

	const isSecondary = computed(() => {
		const className = props.attributes?.className || ''
		return className.includes('is-style-outline')
	})

	const to = computed(() => {
		if (isHashLink.value) return `${props.attributes?.url}`
		if (!isInternalLink.value) return props.attributes?.url || '#' // external link
		return props.attributes?.url?.replace(siteUrlProd, '') || '#' // internal link
	})

	const text = computed(() => {
		return props.attributes?.text
	})

	const id = computed(() => props.attributes?.anchor || undefined)

	const defaultProps = computed(() => ({
		class: {
			'UIButton flex-1 md:flex-initial': true,
			'UIButton-secondary': isSecondary.value,
		},
		target: props.attributes?.linkTarget || undefined,
		title: props.attributes?.title || undefined,
		rel: props.attributes?.rel || undefined,
		id: id.value,
		click: handleClick,
		'data-is-internal-link': isInternalLink.value,
		'data-is-hash-link': isHashLink.value,
	}))

	const handleClick = (e: Event) => {
		if (!isHashLink.value) return
		alert('clicked a hash link')
	}
</script>
