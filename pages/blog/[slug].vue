<template>
	<div class="container mx-auto max-w-3xl">
		<h1 class="text-5xl font-bold mb-8">{{ data.postBy?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.postBy?.blocks" />
	</div>
</template>

<script setup lang="ts">
	import { TempDataResponse } from '@/types'
	const gql = useGql()

	const route = useRoute()
	const data = await gql<'SinglePostBySlug', TempDataResponse, unknown>('SinglePostBySlug', {
		slug: route.params.slug as string,
	})

	if (!data?.postBy) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}
</script>
