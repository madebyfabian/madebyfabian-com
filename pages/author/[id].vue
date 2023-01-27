<template>
	<LayoutAuthorBlogList :authorId="id" />
</template>

<script setup lang="ts">
	const route = useRoute()
	const id = computed(() => route.params.id as string)
</script>
