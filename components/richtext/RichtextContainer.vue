<template>
	<article class="RichtextContainer">
		<RichtextResolver v-for="item of blocks" :key="item.id" :item="item" />
	</article>
</template>

<script lang="ts" setup>
	import type { ItemBase } from '@/types'

	const props = defineProps<{
		blocksRaw: any
		slugKey: string
	}>()

	type Item = ItemBase & {
		block: Record<string, any>
		innerBlocks?: Item[]
	}

	const uid = () => Math.random().toString(36).slice(2, 9)

	const parseItemJson = (item: { attributesJSON: string | null | undefined; name: string; innerBlocks?: any[] }) => {
		const baseBlock: Item = {
			id: uid(),
			name: item.name,
			block: JSON.parse(item.attributesJSON || '{}') as Record<string, any>,
		}

		if (!('innerBlocks' in item)) return baseBlock

		const innerBlocks: Item[] = []
		for (const innerItem of item.innerBlocks || []) {
			innerBlocks.push(parseItemJson(innerItem))
		}

		const newItem: Item = {
			...baseBlock,
			innerBlocks,
		}

		return newItem
	}

	const blocks = useState(`blocks:${props.slugKey}`, () => {
		const blocksRaw = props.blocksRaw
		if (!Array.isArray(props.blocksRaw) || !blocksRaw.length) return []

		const blocks: Item[] = []

		for (const item of blocksRaw) {
			blocks.push(parseItemJson(item as any))
		}

		return blocks
	})
</script>

<style lang="postcss" scoped>
	.RichtextContainer {
		* {
			@apply text-gray-700 underline-offset-2;
		}

		:deep(p) {
			@apply leading-relaxed my-5 text-lg;

			a {
				@apply text-cyan-700 underline font-bold decoration-cyan-700/30;

				&[target='_blank']::after {
					content: ' ↗';
				}
			}

			code {
				@apply bg-gray-100 px-1 rounded text-sm align-baseline font-bold inline-block;
			}
		}

		:deep(figure) {
			@apply my-5;

			p {
				@apply my-0 text-sm text-gray-500;
			}
		}

		:deep(h2) {
			@apply text-4xl font-bold mt-14 my-7;
		}

		:deep(h3) {
			@apply text-2xl font-bold mt-10 mb-5;
		}

		:deep(h4) {
			@apply text-xl font-bold mt-5 mb-5;
		}

		:deep(ul),
		:deep(ol) {
			@apply my-5 ml-4;

			li p {
				@apply my-3;
			}
		}

		:deep(ul) {
			@apply list-disc;
		}

		:deep(ol) {
			@apply list-decimal;
		}

		:deep(pre) {
			@apply bg-gray-100 shadow-inner p-4 rounded-xl my-6 text-sm leading-relaxed overflow-x-auto;
		}
	}
</style>
