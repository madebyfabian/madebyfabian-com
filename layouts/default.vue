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
	if (!data.value?.allSettings || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	useSeoMeta({
		title: 'Home',
		titleTemplate: `%s - ${data.value.allSettings?.generalSettingsTitle}`,
		description: data.value.allSettings?.generalSettingsDescription,
	})
</script>
