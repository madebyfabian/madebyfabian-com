<template>
	<div class="UIArticleMetadata flex gap-x-5 gap-y-2 flex-wrap">
		<p v-if="item.date" class="text-gray-500">{{ dateFormatted }}</p>
		<p v-if="item.author?.node.name">By {{ item.author?.node.name }}</p>
		<ul v-if="item.tags?.edges.length">
			<li
				v-for="tag of item.tags.edges"
				:key="tag.node.id"
				class="text-gray-500 underline underline-offset-2 decoration-gray-300">
				# {{ tag.node.name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { User, Tag } from '@/types/gen/graphql/graphql'
	const props = defineProps<{
		item: {
			date?: string
			author?: {
				node: Pick<User, 'name'>
			}
			tags?: {
				edges: {
					node: Pick<Tag, 'id' | 'name'>
				}[]
			}
		}
	}>()

	const formatDate = ({ date }: { date: string }) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})
	}

	const dateFormatted = computed(() => {
		return props.item.date ? formatDate({ date: props.item.date }) : null
	})
</script>
