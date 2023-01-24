<template>
	<div class="container max-w-3xl">
		<RichtextContainer :blocksRaw="data?.page?.blocks" slugKey="/" />
		<LayoutHome class="mt-12" />
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
