<template>
	<section class="RichtextHtTableOfContents UICard shadow-border-and-inner md:w-1/2 my-12 first:mt-0 last:mb-0 p-6">
		<div class="H3Like mb-6">Table of contents</div>
		<ol class="reset">
			<li
				v-for="(entry, key) of headerEntries"
				:key="entry.link"
				class="flex gap-3 my-3 first:mt-0 last:mb-0 items-center">
				<span class="flex flex-col items-center relative">
					<span
						class="h-8 w-8 shadow-border-2 bg-frost-200 inline-flex items-center justify-center rounded-full text-gray-500">
						<span class="RichtextHtTableOfContents-listKey inline-flex ml-0.5">{{ key + 1 }}.</span>
					</span>
					<span
						v-if="key + 1 !== headerEntries.length"
						class="w-0 shadow-border h-[8px] absolute -bottom-2.5"
						aria-hidden="true" />
				</span>
				<a :href="`#${entry.link}`" :data-link="entry.link" @click.prevent="handleClick" class="UILink">
					{{ entry.text }}
				</a>
			</li>
		</ol>
	</section>
</template>

<script lang="ts">
	import type { RichtextPropsBase, HtBlockTocBlock, UbTableOfContentsHeaderEntry } from '@/types'
	export type RichtextHtTableOfContentsProps = RichtextPropsBase<HtBlockTocBlock>

	//
</script>

<script setup lang="ts">
	const props = defineProps<{
		attributes: RichtextHtTableOfContentsProps['attributes']
		innerBlocks?: RichtextHtTableOfContentsProps['innerBlocks']
		mediaItemsStorageKey: RichtextHtTableOfContentsProps['mediaItemsStorageKey']
	}>()

	const headerEntries = computed(() => {
		return (props.attributes?.headerEntries as any as UbTableOfContentsHeaderEntry[]) || []
	})

	const handleClick = (e: MouseEvent) => {
		if (!e.target) return
		const eventTarget = e.target as HTMLAnchorElement

		// Find element
		const element = document.querySelector(`[id='${eventTarget.dataset.link}']`)
		element?.scrollIntoView({
			behavior: 'smooth',
		})
	}
</script>

<style lang="postcss" scoped>
	.RichtextHtTableOfContents-listKey {
		font-feature-settings: 'tnum' on, 'lnum' on;
	}
</style>
