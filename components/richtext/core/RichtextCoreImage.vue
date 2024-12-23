<template>
	<figure class="RichtextCoreImage" :id="id">
		<component :is="props.attributes?.href ? 'a' : 'div'" v-bind="containerProps">
			<NuxtImg
				v-if="props.attributes?.url"
				:src="props.attributes.url"
				:alt="alt"
				:width="mediaData?.mediaDetails.width"
				:height="mediaData?.mediaDetails.height"
				class="rounded-box safari-overflow-fix shadow-border select-none object-cover" />
		</component>

		<figcaption v-if="caption" class="text-center mt-2" v-html="caption" />
	</figure>
</template>

<script setup lang="ts">
	import type { RichtextPropsBase, CoreImageBlock } from '@/types'
	export type RichtextCoreImageProps = RichtextPropsBase<CoreImageBlock>

	const props = defineProps<{
		attributes: RichtextCoreImageProps['attributes']
		innerBlocks?: RichtextCoreImageProps['innerBlocks']
	}>()

	const mediaData = useMediaItemData({ id: props.attributes?.id })

	const caption = computed(() => {
		if (props.attributes?.caption) return `<p>${props.attributes?.caption}</p>`
		return mediaData.value?.caption || mediaData.value?.description || undefined
	})

	const id = computed(() => props.attributes?.anchor || undefined)

	const isLink = computed(() => !!props.attributes?.href)
	const alt = computed(() => {
		return props.attributes?.alt || props.attributes?.title || ''
	})
	const containerProps = computed(() => ({
		href: props.attributes?.href || undefined,
		target: props.attributes?.linkTarget || undefined,
		title: alt.value,
		rel: props.attributes?.rel || undefined,
		class: isLink.value ? 'block' : undefined,
	}))
</script>
