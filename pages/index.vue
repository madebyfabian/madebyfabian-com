<template>
	<LayoutPage :uri="uri">
		<LayoutBlogList :uniqueKey="uri" />
	</LayoutPage>
</template>

<script setup lang="ts">
	const route = useRoute('index')
	const uri = computed(() => route.fullPath)
</script>
