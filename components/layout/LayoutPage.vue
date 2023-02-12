<template>
	<section v-if="data?.page" class="LayoutPage container" :class="{ 'max-w-3xl': props.containerSize !== 'large' }">
		<slot name="beforeRichtext"></slot>
		<h1 v-if="props.hasH1 && data.page?.title" class="mb-6 lg:mb-12">{{ data.page?.title }}</h1>
		<RichtextContainer :blocks="data.page?.blocks" :mediaItems="data.mediaItems" :uniqueKey="uri" />
		<slot></slot>
	</section>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()
	const route = useRoute()

	const props = defineProps<{
		hasH1?: boolean
		containerSize?: undefined | 'large'
	}>()

	const uri = computed(() => route.path)

	const { data, error } = await $client.singlePage.get.useQuery({
		uri: uri.value,
	})
	if (!data.value?.page || error.value) {
		throw createError({ statusCode: 404, message: 'Page not found', fatal: true })
	}

	useSeoMeta({
		title: data.value.page?.title,
	})
</script>
