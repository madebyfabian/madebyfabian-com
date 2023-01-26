<template>
	<LayoutHeader />
	<div class="flex-1">
		<slot />
	</div>
	<LayoutFooter />
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()
	const { data, error } = await $client.general.allSettings.useQuery()
	if (!data.value?.allSettings || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	const prefix = process.env.NODE_ENV === 'development' ? '⚙️ ' : ''

	useSeoMeta({
		title: 'Home',
		titleTemplate: `${prefix}%s — ${data.value.allSettings.generalSettingsTitle}`,
		description: data.value.allSettings.generalSettingsDescription,
	})
</script>
