<template>
	<LayoutHeader />
	<div class="flex-1">
		<slot />
	</div>
	<LayoutFooter />
</template>

<script lang="ts" setup>
	const { data, error } = await useAsyncGql({
		operation: 'AllSettings',
	})
	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	useHead({
		title: 'Start',
		htmlAttrs: {
			lang: 'en-US',
		},
		titleTemplate: `%s - ${data.value?.allSettings?.generalSettingsTitle}`,
		meta: [{ name: 'description', content: data.value?.allSettings?.generalSettingsDescription }],
	})
</script>
