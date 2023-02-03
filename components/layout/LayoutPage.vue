<template>
	<section v-if="data?.page" class="LayoutPage container" :class="{ 'max-w-3xl': props.containerSize !== 'large' }">
		<h1 v-if="props.hasH1 && data.page?.title" class="mb-16">{{ data.page?.title }}</h1>
		<RichtextContainer :blocks="data.page?.blocks" :uniqueKey="props.uri" />
		<slot />
	</section>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()

	const props = defineProps<{
		hasH1?: boolean
		uri: string
		containerSize?: undefined | 'large'
	}>()

	const { data, error } = await $client.singlePage.get.useQuery({
		uri: props.uri,
	})
	if (!data.value?.page || error.value) {
		throw createError({ statusCode: 404, message: 'Page not found', fatal: true })
	}

	useSeoMeta({
		title: data.value.page?.title,
	})
</script>
