<template>
	<div v-if="data?.post" class="LayoutPost container">
		<div>
			<NuxtLink :to="{ name: 'index' }" class="UILink mb-12 inline-block cursor-pointer">
				<span>&larr; Back</span>
			</NuxtLink>

			<h1>{{ data.post?.title }}</h1>
			<UIArticleMetadata
				class="mb-8"
				linkAvatar
				:item="{
					dateGmt: data.post.dateGmt,
					author: data.post.author,
					tags: data.post.tags,
				}" />
		</div>

		<div class="flex flex-col lg:grid grid-cols-12 gap-12">
			<div class="order-2 lg:order-1 lg:col-span-8">
				<RichtextContainer :blocks="data.post?.blocks" :mediaItems="data.mediaItems" />
			</div>

			<div class="order-1 lg:order-2 col-span-4">
				<UITableOfContents v-if="tocList" :entries="tocList" class="lg:sticky lg:top-32" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		uri: string
	}>()

	const { data, error } = await useAsyncData(`LayoutPost:${props.uri}`, () => {
		return $fetch('/api/singlePost', {
			params: {
				uri: props.uri,
			},
		})
	})
	if (!data.value?.post || error.value) {
		throw createError({ statusCode: 404, message: 'Blog Post not found', fatal: true })
	}

	const tocList = computed(() => {
		return data.value?.tocEntriesList?.[0]
	})

	useSeoMeta({
		title: data.value.post?.title,
		description: data.value.post?.excerpt,
		ogImage: data.value.post?.featuredImage?.node?.sourceUrl,
	})
</script>
