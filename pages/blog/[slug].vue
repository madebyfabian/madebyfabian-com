<template>
	<div class="container">
		<pre>{{ data }}</pre>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()
	const { data } = await useAsyncGql({
		operation: 'SinglePostBySlug',
		variables: {
			slug: route.params.slug as string,
		},
	})
	if (!data.value?.postBy) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}
</script>
