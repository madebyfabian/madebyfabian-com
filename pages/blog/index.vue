<template>
	<LayoutPage hasH1 :uri="uri">
		<LayoutBlogList />
	</LayoutPage>
</template>

<script setup lang="ts">
	const uri = '/blog/'
</script>
