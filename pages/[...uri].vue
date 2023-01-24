<template>
	<div class="container mx-auto max-w-3xl">
		<h1 class="text-5xl font-bold mb-8">{{ data.postBy?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.postBy?.blocks" :slugKey="uri" />
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

	const uri = computed(() => route.params.uri as string)

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
		title: data.value?.postBy?.title,
		meta: [{ name: 'description', content: data.value?.postBy?.excerpt }],
	})
</script>
