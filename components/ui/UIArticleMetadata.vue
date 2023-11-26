<template>
	<div class="UIArticleMetadata flex gap-x-6 gap-y-5 flex-wrap items-center">
		<component
			v-if="item.author?.node.name"
			:is="linkAvatar ? NuxtLink : 'div'"
			:title="linkAvatar ? `View all posts by ${item.author.node.name}` : undefined"
			:to="resolveLinkAvatar({ id: String(item.author.node.databaseId) })"
			class="flex items-center gap-2.5 font-bold">
			<UIAvatar
				:url="item.author?.node.avatar?.url"
				:size="32"
				:name="item.author?.node.name || ''"
				:notFound="!item.author.node.avatar?.foundAvatar" />
			{{ item.author?.node.name }}
		</component>

		<p v-if="item.dateGmt" class="text-gray-500">{{ dateFormatted }}</p>

		<UITagList :tags="item?.tags?.edges" />
	</div>
</template>

<script setup lang="ts">
	import type { NodeWithAuthorToUserConnectionEdge, PostToTagConnection, Post } from '@/types'
	const NuxtLink = resolveComponent('NuxtLink')
	const router = useRouter()

	const props = defineProps<{
		linkAvatar?: boolean
		item: {
			dateGmt?: Post['dateGmt']
			author?: NodeWithAuthorToUserConnectionEdge
			tags?: PostToTagConnection
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
		return props.item.dateGmt ? formatDate({ date: props.item.dateGmt }) : null
	})

	const resolveLinkAvatar = ({ id }: { id: string }) => {
		if (!props.linkAvatar) return undefined
		return router.resolve({
			name: 'author-id',
			params: { id },
		})
	}
</script>
