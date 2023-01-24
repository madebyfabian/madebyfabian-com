<template>
	<div class="container mx-auto max-w-3xl">
		<UILink to="/" class="mb-12 block">&larr; Back to Home</UILink>
		<h1 class="text-5xl font-bold mb-8">{{ data.postBy?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.postBy?.blocks" :slugKey="slug" />
	</div>
</template>

<script setup lang="ts">
	import { TempDataResponse } from '@/types'
	const gql = useGql()

	const slug = computed(() => route.params.slug as string)

	const route = useRoute()
	const data = await gql<'SinglePostBySlug', TempDataResponse, unknown>('SinglePostBySlug', {
		slug: slug.value,
	})

	if (!data?.postBy) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}
</script>
