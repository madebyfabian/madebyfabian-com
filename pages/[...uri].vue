<template>
	<div class="container mx-auto max-w-3xl">
		<h1>{{ data.page?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.page?.blocks" :slugKey="uri" />
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

	const uri = computed(() => {
		const base = Array.isArray(route.params.uri) ? route.params.uri.join('/') : route.params.uri
		return `/${base}/`
	})

	const { data } = await useAsyncGql({
		operation: 'SinglePageByUri',
		variables: {
			uri: uri.value,
		},
	})

	if (!data.value?.page) {
		throw createError({ statusCode: 404, message: 'Page not found' })
	}

	useHead({
		title: data.value?.page?.title,
		meta: [{ name: 'description', content: data.value?.page?.excerpt }],
	})
</script>
