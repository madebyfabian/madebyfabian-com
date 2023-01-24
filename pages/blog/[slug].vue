<template>
	<div class="container mx-auto max-w-3xl">
		<UILink to="/" class="mb-12 block">&larr; Back to Home</UILink>
		<h1 class="text-5xl font-bold mb-8">{{ data.post?.title }}</h1>
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
		meta: [{ name: 'description', content: data.value.post?.excerpt }],
	})
</script>
