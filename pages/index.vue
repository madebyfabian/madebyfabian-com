<template>
	<div class="container max-w-3xl">
		<h1 class="text-5xl font-bold mb-8">{{ data.page?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/" />
		<LayoutHome />
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
		title: data.value?.postBy?.title,
		meta: [{ name: 'description', content: data.value?.postBy?.excerpt }],
	})
</script>
