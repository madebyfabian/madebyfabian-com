<template>
	<div class="LayoutPage">
		<div v-if="data?.page" class="container max-w-3xl">
			<h1 v-if="props.hasH1 && data.page?.title">{{ data.page?.title }}</h1>
			<RichtextContainer :blocks="data.page?.blocks" :uniqueKey="props.uri" />
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()

	const props = defineProps<{
		hasH1?: boolean
		uri: string
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
