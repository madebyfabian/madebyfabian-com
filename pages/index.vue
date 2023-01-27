<template>
	<LayoutPage :uri="uri">
		<LayoutBlogList :uniqueKey="`homePage`" />
	</LayoutPage>
</template>

<script setup lang="ts">
	const uri = '/'
</script>
