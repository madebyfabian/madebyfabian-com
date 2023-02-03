<template>
	<LayoutProjectItem
		:imageSrc="mediaSrc"
		imageAlt=""
		:imageStyle="props.attributes?.imageAlign === 'top' ? { top: 0 } : { bottom: 0 }"
		:id="id"
		class="RichtextLazyblockProjectItem">
		<template #title>{{ props.attributes?.title }}</template>
		<WrapBalancer as="p" class="reset" :ratio="0.15">
			{{ props.attributes?.description1 }}
		</WrapBalancer>
		<WrapBalancer as="p" class="reset" :ratio="0.15">
			{{ props.attributes?.description2 }}
		</WrapBalancer>
		<template #linkLabel> {{ props.attributes?.linkLabel }} </template>
	</LayoutProjectItem>
</template>

<script lang="ts">
	import type { RichtextPropsBase, LazyblockProjectItemBlock } from '@/types'
	export type RichtextLazyblockProjectItemProps = RichtextPropsBase<LazyblockProjectItemBlock>

	//
</script>

<script setup lang="ts">
	import { withHttps } from 'ufo'

	const runtimeConfig = useRuntimeConfig()

	const props = defineProps<{
		attributes: RichtextLazyblockProjectItemProps['attributes']
		innerBlocks?: RichtextLazyblockProjectItemProps['innerBlocks']
		mediaItemsStorageKey: RichtextLazyblockProjectItemProps['mediaItemsStorageKey']
	}>()

	const mediaData = useMediaItemData({
		key: props.mediaItemsStorageKey,
		id: Number((props.attributes?.image as any)?.id),
	})

	const mediaSrc = computed(() => {
		/** @TODO maybe make this composable */
		const fullUrl = (props.attributes?.image as any).url
		const wpHostWithProtocol = withHttps(runtimeConfig.public.wpHost)
		const replaced = fullUrl.replace(wpHostWithProtocol, '')
		return replaced
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
