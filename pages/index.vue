<template>
	<div class="container max-w-3xl">
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/" />
		<LayoutBlogList />
	</div>
</template>

<script lang="ts" setup>
	const { data, error } = await useAsyncGql({
		operation: 'SinglePage',
		variables: {
			uri: '/',
		},
	})
	if (!data.value?.page || error.value) {
		throw createError({ statusCode: 404, message: 'Page not found' })
	}

	useHead({
		title: data.value?.page?.title,
	})
</script>
