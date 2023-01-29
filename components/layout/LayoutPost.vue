<template>
	<div class="LayoutPost">
		<div v-if="data?.post" class="container mx-auto max-w-3xl">
			<NuxtLink :to="{ name: 'index' }" class="UILink mb-12 inline-block cursor-pointer">
				<span>&larr; Back</span>
			</NuxtLink>
			<h1>{{ data.post?.title }}</h1>
			<UIArticleMetadata
				class="mb-8"
				linkAvatar
				:item="{
					dateGmt: data.post.dateGmt,
					author: data.post.author,
					tags: data.post.tags,
				}" />
			<RichtextContainer :blocks="data.post?.blocks" :mediaItems="data.mediaItems" :uniqueKey="props.uri" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const { $client } = useNuxtApp()

	const props = defineProps<{
		uri: string
	}>()

	const { data, error } = await $client.singlePost.get.useQuery({
		uri: props.uri,
	})
	if (!data.value?.post || error.value) {
		throw createError({ statusCode: 404, message: 'Blog Post not found', fatal: true })
	}

	useSeoMeta({
		title: data.value.post?.title,
		description: data.value.post?.excerpt,
		ogImage: data.value.post?.featuredImage?.node?.sourceUrl,
	})
</script>
