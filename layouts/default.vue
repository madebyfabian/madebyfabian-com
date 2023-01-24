<template>
	<LayoutHeader />
	<div class="flex-1">
		<slot />
	</div>
	<LayoutFooter />
</template>

<script lang="ts" setup>
	const { data } = await useAsyncGql({
		operation: 'AllSettings',
	})

	useHead({
		title: 'Start',
		titleTemplate: `%s - ${data.value?.allSettings?.generalSettingsTitle}`,
		meta: [{ name: 'description', content: data.value?.allSettings?.generalSettingsDescription }],
	})
</script>
