<template>
	<section v-if="data" class="LayoutBlogList mt-8">
		<NuxtLink
			v-for="item of data"
			:key="item.id"
			:to="item.uri || ''"
			class="UICard my-6 flex flex-col gap-6 md:flex-row p-6">
			<div class="shrink-0">
				<NuxtImg
					v-if="item.featuredImage?.node?.sourceUrl"
					:src="item.featuredImage.node.sourceUrl"
					:alt="item.featuredImage?.node?.altText || ''"
					class="w-full md:w-[296px] h-56 md:h-full rounded-md object-cover" />
			</div>

			<div>
				<h2 class="H3Like mb-2">
					{{ item.title }}
				</h2>

				<p class="my-2">
					<span v-text="item.excerpt"></span>
				</p>

				<UIArticleMetadata
					class="mt-4"
					:item="{
						dateGmt: item.dateGmt || undefined,
						author: item.author || (undefined as any),
						tags: item.tags || (undefined as any),
					}" />
			</div>
		</NuxtLink>
	</section>
</template>

<script lang="ts" setup>
	import type { Post } from '@/types'

	const props = defineProps<{
		posts?: Partial<Post>[]
		uniqueKey: string
	}>()

	const { data, error } = await useAsyncData(`ListPosts:${props.uniqueKey}`, async () => {
		if (props.posts) {
			return props.posts
		}

		const { data: queryData } = await useGraphqlQuery('ListPosts')
		if (!queryData.posts) {
			throw createError({ statusCode: 500, message: 'Error fetching posts in blog list', fatal: true })
		}

		return queryData?.posts?.nodes
	})

	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error displaying posts in blog list', fatal: true })
	}
</script>
