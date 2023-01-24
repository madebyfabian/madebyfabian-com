<template>
	<div class="container max-w-3xl">
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/" />
		<LayoutBlogList />
	</div>
</template>

<script lang="ts" setup>
	const { data } = await useAsyncGql({
		operation: 'SinglePageByUri',
		variables: {
			uri: '/',
		},
	})

	useHead({
		title: data.value?.page?.title,
	})
</script>
