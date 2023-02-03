<template>
	<LayoutPage :uri="uri" containerSize="large">
		<div class="mx-auto max-w-3xl mt-6">
			<h2 class="mb-12 H2-Like text-center">Recent Posts</h2>
			<LayoutBlogList :uniqueKey="uri" />
			<div class="flex justify-center">
				<NuxtLink class="UIButton UIButton-secondary mt-6" :to="{ name: 'blog' }"> See all posts </NuxtLink>
			</div>
		</div>
	</LayoutPage>
</template>

<script setup lang="ts">
	const route = useRoute('index')
	const uri = computed(() => route.fullPath)
</script>
