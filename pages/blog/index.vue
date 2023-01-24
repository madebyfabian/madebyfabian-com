<template>
	<div class="container max-w-3xl">
		<h1>{{ data?.page?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/blog" />
		<LayoutBlogList />
	</div>
</template>

<script lang="ts" setup>
	const { data } = await useAsyncGql({
		operation: 'SinglePageByUri',
		variables: {
			uri: '/blog/',
		},
	})

	useHead({
		title: data.value?.page?.title,
	})
</script>
