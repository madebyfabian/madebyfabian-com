<template>
	<LayoutAuthorBlogList :authorId="id" />
</template>

<script setup lang="ts">
	const route = useRoute('author-id')
	const id = computed(() => route.params.id)
</script>
