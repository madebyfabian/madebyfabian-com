<template>
	<LayoutTeaserItem
		:imageSrc="mediaSrc"
		imageAlt=""
		:imageStyle="props.attributes?.imageAlign === 'top' ? { top: 0 } : { bottom: 0 }"
		:id="id"
		class="RichtextLazyblockProjectItem">
		<template #title>{{ props.attributes?.title }}</template>
		<p class="reset">
			{{ props.attributes?.description1 }}
		</p>
		<p class="reset">
			{{ props.attributes?.description2 }}
		</p>
		<template #linkLabel> {{ props.attributes?.linkLabel }} </template>
	</LayoutTeaserItem>
</template>

<script lang="ts">
	import type { RichtextPropsBase, LazyblockProjectItemBlock } from '@/types'
	export type RichtextLazyblockProjectItemProps = RichtextPropsBase<LazyblockProjectItemBlock>

	//
</script>

<script setup lang="ts">
	const { withoutWPHost } = useWPImage()

	const props = defineProps<{
		attributes: RichtextLazyblockProjectItemProps['attributes']
		innerBlocks?: RichtextLazyblockProjectItemProps['innerBlocks']
	}>()

	const mediaSrc = computed(() => {
		return withoutWPHost((props.attributes?.image as any).url)
	})

	const id = computed(() => props.attributes?.anchor || undefined)
</script>
