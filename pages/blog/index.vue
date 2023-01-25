<template>
	<div class="container max-w-3xl">
		<h1>{{ data?.page?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/blog" />
		<LayoutBlogList />
	</div>
</template>

<script lang="ts" setup>
	const { data, error } = await useAsyncGql({
		operation: 'SinglePage',
		variables: {
			uri: '/blog/',
		},
	})
	if (!data.value?.page || error.value) {
		throw createError({ statusCode: 404, message: 'Page not found' })
	}

	useSeoMeta({
		title: data.value.page?.title,
	})
</script>
