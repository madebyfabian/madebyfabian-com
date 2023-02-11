<template>
	<section class="UITableOfContents UICard shadow-border-and-inner p-6">
		<div class="H3Like mb-6">Table of contents</div>
		<ol class="reset">
			<li
				v-for="(entry, key) of props.entries"
				:key="entry.link"
				class="flex gap-3 my-3 first:mt-0 last:mb-0 items-center">
				<span class="flex flex-col items-center relative">
					<span
						class="h-8 w-8 shadow-border-2 bg-frost-200 inline-flex items-center justify-center rounded-full text-gray-500">
						<span class="UITableOfContents-listKey inline-flex ml-0.5">{{ key + 1 }}.</span>
					</span>
					<span
						v-if="key + 1 !== props.entries.length"
						class="w-0 shadow-border h-[8px] absolute -bottom-2.5"
						aria-hidden="true" />
				</span>
				<NuxtLink :to="`#${entry.link}`" class="UILink" external>
					{{ entry.text }}
				</NuxtLink>
			</li>
		</ol>
	</section>
</template>

<script setup lang="ts">
	import type { UbTableOfContentsHeaderEntry } from '@/types'

	const props = defineProps<{
		entries: UbTableOfContentsHeaderEntry[]
	}>()
</script>

<style lang="postcss" scoped>
	.UITableOfContents-listKey {
		font-feature-settings: 'tnum' on, 'lnum' on;
	}
</style>
