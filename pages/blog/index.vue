<template>
	<LayoutPage hasH1 :uri="uri">
		<LayoutBlogList uniqueKey="blogPage" />
	</LayoutPage>
</template>

<script setup lang="ts">
	const uri = '/blog/'
</script>
