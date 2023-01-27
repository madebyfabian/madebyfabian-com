<template>
	<NuxtLoadingIndicator :color="colors.sky[300]" :height="4" />
	<LayoutHeader />
	<div class="flex-1">
		<NuxtPage />
	</div>
	<LayoutFooter />
</template>

<script lang="ts" setup>
	import colors from 'tailwindcss/colors'

	const { $client } = useNuxtApp()
	const { data, error } = await $client.general.allSettings.useQuery()
	if (!data.value?.allSettings || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	const prefix = process.env.NODE_ENV === 'development' ? '⚙️ ' : ''
	const name = data.value.allSettings.generalSettingsTitle || ''

	useSeoMeta({
		title: 'Home',
		titleTemplate: `${prefix}%s — ${data.value.allSettings.generalSettingsTitle}`,
		description: data.value.allSettings.generalSettingsDescription,
	})

	useSchemaOrg([
		definePerson({
			name: `${data.value.viewer?.firstName} ${data.value.viewer?.lastName}`,
			logo: data.value.viewer?.avatar?.url || undefined,
			sameAs: data.value.viewer?.url || undefined,
		}),
		defineWebSite({
			name,
		}),
		defineWebPage(),
	])
</script>

<style lang="postcss">
	.page-enter-active,
	.page-leave-active {
		transition: all 150ms;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(0.5rem);
	}

	.page-enter-from {
		transform: translate(1rem, 0);
	}

	.page-leave-to {
		transform: translate(-1rem, 0);
	}
</style>
