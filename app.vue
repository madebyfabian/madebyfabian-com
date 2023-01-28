<template>
	<SeoKit />
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

	// const prefix = process.env.NODE_ENV === 'development' ? '⚙️ ' : ''
	const siteTitle = data.value.allSettings.generalSettingsTitle || ''
	const siteDescription = data.value.allSettings.generalSettingsDescription || undefined

	useSeoMeta({
		/** @see https://github.com/harlan-zw/nuxt-seo-kit/issues/20 */
		// titleTemplate: `${prefix}%s — ${siteTitle}`,
		title: 'Home',
		description: siteDescription,
	})

	useSchemaOrg([
		definePerson({
			name: () => `${data.value?.viewer?.firstName} ${data.value?.viewer?.lastName}`,
			logo: () => data.value?.viewer?.avatar?.url || undefined,
			sameAs: () => data.value?.viewer?.url || undefined,
		}),
		defineWebSite({
			name: siteTitle,
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
		filter: blur(0.25rem);
	}

	.page-enter-from {
		transform: translate(0, 0.5rem);
	}

	.page-leave-to {
		transform: translate(0, -0.5rem);
	}
</style>
