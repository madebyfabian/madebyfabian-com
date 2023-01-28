<template>
	<div v-if="data" class="LayoutBlogList mt-12">
		<NuxtLink
			v-for="item of data"
			:key="item.id"
			:to="(item.uri as string)"
			class="my-6 border rounded-xl flex flex-col md:flex-row overflow-hidden">
			<div class="w-full h-[144px] md:h-auto md:w-[224px] shrink-0 bg-gray-100 flex items-center justify-center">
				<NuxtImg
					v-if="item?.featuredImage?.node"
					fit="cover"
					class="w-full h-full object-cover object-center"
					:height="144"
					:width="224"
					:alt="item.featuredImage?.node.altText || ''"
					:src="item.featuredImage?.node.sourceUrl || undefined"
					:sizes="`lg:${224 * 1.5}`" />

				<span v-else class="text-3xl">🏡</span>
			</div>

			<div class="p-6">
				<h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
				<p class="my-2">
					<span v-text="item.excerpt"></span>
				</p>

				<UIArticleMetadata
					class="mt-4"
					:item="{
						dateGmt: item.dateGmt || undefined,
						author: item.author || undefined as any,
						tags: item.tags || undefined as any,
					}" />
			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
	import type { Post } from '@/types/gen/graphql/graphql'

	const { $client } = useNuxtApp()

	const props = defineProps<{
		posts?: Partial<Post>[]
		uniqueKey: string
	}>()

	const { data, error } = await useAsyncData(async () => {
		if (props.posts) {
			return props.posts
		}

		const { data: queryData, error: queryError } = await $client.general.listPosts.useQuery()
		if (queryError.value) {
			throw createError({ statusCode: 500, message: 'Error fetching posts in blog list', fatal: true })
		}

		return queryData.value?.posts?.nodes
	})

	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error displaying posts in blog list', fatal: true })
	}
</script>
