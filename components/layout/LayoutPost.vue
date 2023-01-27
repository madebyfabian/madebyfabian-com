<template>
	<div v-if="data?.post" class="container mx-auto max-w-3xl">
		<UILink to="/" class="mb-12 block">&larr; Back to Home</UILink>
		<h1>{{ data.post?.title }}</h1>
		<UIArticleMetadata
			v-bind="{
				item: {
					date: data.post.dateGmt,
					author: data.post.author,
					tags: data.post.tags,
				},
			}" />
		<RichtextContainer :blocks="data.post?.blocks" />
	</div>
</template>

<script setup lang="ts">
	const { $client } = useNuxtApp()

	const props = defineProps<{
		slug: string
	}>()

	const { data, error } = await $client.singlePost.get.useQuery({
		slug: props.slug,
	})
	if (!data.value?.post || error.value) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}

	useSeoMeta({
		title: data.value.post?.title,
		description: data.value.post?.excerpt,
		ogImage: data.value.post?.featuredImage?.node?.sourceUrl,
	})
</script>
