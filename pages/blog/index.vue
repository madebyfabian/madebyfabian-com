<template>
	<LayoutPage hasH1 :uri="uri">
		<LayoutBlogList :uniqueKey="uri" />
	</LayoutPage>
</template>

<script setup lang="ts">
	const route = useRoute('blog')
	const uri = computed(() => route.fullPath)
</script>
