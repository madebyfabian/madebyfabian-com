<template>
	<section v-if="data" class="LayoutBlogList mt-8">
		<NuxtLink
			v-for="item of data"
			:key="item.id"
			:to="(item.uri as string)"
			class="UICard my-6 flex flex-col md:flex-row">
			<div class="shrink-0">
				<WPImage
					:src="item.featuredImage?.node?.sourceUrl || undefined"
					:alt="item.featuredImage?.node?.altText || ''"
					:path="'/wordpress-madebyfabian/'"
					class="w-full md:w-[296px] h-56 md:h-full">
					<template #fallback>
						<div class="flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
							<span class="text-3xl">🏡</span>
						</div>
					</template>
				</WPImage>
			</div>

			<div class="p-6">
				<h2 class="H3Like mb-2">{{ item.title }}</h2>
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
	</section>
</template>

<script lang="ts" setup>
	import type { Post } from '@/types'

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
