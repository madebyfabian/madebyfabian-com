<template>
	<LayoutPage>
		<LayoutBlogList :uniqueKey="uri" />
	</LayoutPage>
</template>

<script setup lang="ts">
	const route = useRoute('blog')
	const uri = computed(() => route.path)
</script>
