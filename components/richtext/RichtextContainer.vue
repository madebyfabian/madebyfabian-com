<template>
	<article class="RichtextContainer">
		<RichtextResolver v-for="item of props.blocks" :key="item.id" :item="item" :mediaItemsStorageKey="storageKey" />
	</article>
</template>

<script lang="ts" setup>
	import type { RichtextItem } from '@/components/richtext/RichtextResolver.vue'

	const props = defineProps<{
		mediaItems?: any
		blocks: RichtextItem[]
		uniqueKey: string
	}>()

	const storageKey = `RichtextContainer:${props.uniqueKey}:mediaItems`

	// Inject the media items data into the global storage
	useState(storageKey, () => {
		return props.mediaItems
	})
</script>

<style lang="postcss" scoped>
	.RichtextContainer {
		@apply mt-12;

		:deep(p) {
			@apply leading-relaxed my-6 first:mt-0 last:mb-0 text-lg;

			a {
				@apply text-cyan-700 underline font-bold decoration-cyan-700/30;
			}

			code {
				@apply bg-gray-100 px-1 rounded text-sm align-baseline font-bold inline-block;
			}
		}

		:deep(figure) {
			@apply my-6 first:mt-0 last:mb-0;

			p {
				@apply my-0 text-sm text-gray-500;
			}
		}

		:deep(h2) {
			@apply text-4xl font-bold mt-14 mb-7 first:mt-0 last:mb-0 tracking-tighter;
		}

		:deep(h3) {
			@apply text-2xl font-bold mt-10 mb-6 first:mt-0 last:mb-0;
		}

		:deep(h4) {
			@apply text-xl font-bold mt-6 mb-6 first:mt-0 last:mb-0;
		}

		:deep(ul),
		:deep(ol) {
			@apply my-6 first:mt-0 last:mb-0 ml-4;

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
			@apply bg-gray-100 shadow-inner p-4 rounded-xl my-6 first:mt-0 last:mb-0 text-sm leading-relaxed overflow-x-auto;
		}
	}
</style>
