<template>
	<div class="container mx-auto max-w-3xl">
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
		<RichtextContainer :blocksRaw="data?.post?.blocks" :slugKey="slug" />
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

	const slug = computed(() => route.params.slug as string)

	const { data } = await useAsyncGql({
		operation: 'SinglePostBySlug',
		variables: {
			slug: slug.value,
		},
	})

	if (!data.value?.post) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}

	useHead({
		title: data.value.post?.title,
		meta: [
			{ name: 'description', content: data.value.post?.excerpt },
			data.value.post?.featuredImage?.node?.sourceUrl
				? { property: 'og:image', content: data.value.post?.featuredImage?.node?.sourceUrl }
				: {},
		],
	})
</script>
