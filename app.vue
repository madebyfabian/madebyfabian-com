<template>
	<div>
		<Page>
			<SeoKit :siteName="siteName" />
			<NuxtLoadingIndicator :color="color" :height="4" />
			<CookieControlBanner />
			<NuxtPage />
		</Page>
	</div>
</template>

<script lang="ts" setup>
	import tailwindConfig from '@/tailwind.config'

	const color = (tailwindConfig.theme?.extend?.colors as any)?.['accent']?.['700']

	const { $client } = useNuxtApp()
	const { data, error } = await $client.general.allSettings.useQuery()
	if (!data.value?.allSettings || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	const prefix = process.env.NODE_ENV === 'development' ? '⚙️ ' : ''
	const siteName = data.value.allSettings.generalSettingsTitle || ''
	const siteDescription = data.value.allSettings.generalSettingsDescription || undefined

	useSeoMeta({
		titleTemplate: `${prefix}%s %titleSeperator %siteName`,
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
			name: siteName,
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
