<template>
	<article v-if="props.blocks.length" class="RichtextContainer">
		<RichtextResolver
			v-for="item of props.blocks"
			:key="item.id"
			v-bind="{ item, mediaItemsStorageKey: storageKey }" />
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
		@apply flow-root;

		:deep(.RichtextCoreParagraph):not(.reset) {
			p {
				@apply PLike;
			}

			&.RichtextCoreParagraph-large {
				p {
					@apply PLargeLike;
				}
			}
		}

		:deep(.RichtextCoreParagraph):not(.reset),
		:deep(p):not(.reset) {
			@apply PLike my-6 first:mt-0 last:mb-0;

			a {
				@apply UILink;

				/* These are technically the same, but use both */
				overflow-wrap: break-word;
				word-wrap: break-word;

				word-break: break-word;

				/* Adds a hyphen where the word breaks, if supported (No Blink) */
				hyphens: auto;
			}

			code {
				@apply bg-frost-200 shadow-border px-1 mx-0.5 rounded text-sm align-baseline font-bold inline-block;
			}
		}

		:deep(figure):not(.reset) {
			@apply my-6 first:mt-0 last:mb-0;

			.RichtextCoreParagraph {
				@apply my-0 text-sm text-gray-500;
			}
		}

		:deep(.RichtextCoreHeading):not(.reset) {
			&:has(h1) {
				@apply mb-6 last:mb-0;

				h1 {
					@apply H1Like !m-0;
				}
			}

			&:has(h2) {
				@apply mt-14 mb-7 first:mt-0 last:mb-0;

				h2 {
					@apply H2Like;
				}
			}

			&:has(h3) {
				@apply mt-10 mb-6 first:mt-0 last:mb-0;

				h3 {
					@apply H3Like;
				}
			}

			&:has(h4) {
				@apply mt-10 mb-6 first:mt-0 last:mb-0;

				h4 {
					@apply H4Like;
				}
			}
		}

		:deep(ul):not(.reset),
		:deep(ol):not(.reset) {
			@apply my-6 first:mt-0 last:mb-0 ml-6;

			li {
				&::marker {
					@apply PLike;
				}

				p {
					@apply !my-4;
				}

				& ul,
				& ol {
					@apply first-of-type:mt-0;
				}
			}
		}

		:deep(ul):not(.reset) {
			@apply list-[circle];
		}

		:deep(ol):not(.reset) {
			@apply list-decimal;

			li {
				&::marker {
					@apply text-gray-400;
				}
			}
		}

		:deep(pre):not(.reset) {
			@apply PreLike my-6 first:mt-0 last:mb-0;
		}
	}
</style>
