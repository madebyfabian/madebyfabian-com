<template>
	<div v-if="data?.posts?.nodes" class="LayoutBlogList mt-12">
		<NuxtLink
			v-for="item of data.posts.nodes"
			:key="item.id"
			:to="`/blog/${item.slug}`"
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
					v-bind="{
						item: {
							date: item.dateGmt || undefined,
							author: item.author || undefined,
							tags: item.tags || undefined,
						},
					}" />
			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()
	const { data, error } = await $client.general.listPosts.useQuery()
	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching posts in blog list' })
	}
</script>
