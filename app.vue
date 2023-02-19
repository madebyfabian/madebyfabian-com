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
	import { joinURL } from 'ufo'
	const runtimeConfig = useRuntimeConfig()

	const color = (tailwindConfig.theme?.extend?.colors as any)?.['accent']?.['700']

	const { data, error } = await useAsyncData(() => useGraphqlQuery('AllSettings'))
	const allSettings = computed(() => data.value?.data.allSettings)
	const viewer = computed(() => data.value?.data.viewer)
	if (!allSettings.value || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching settings' })
	}

	const siteName = allSettings.value.generalSettingsTitle || ''
	const siteDescription = allSettings.value.generalSettingsDescription || undefined

	useSeoMeta({
		title: 'Home',
		description: siteDescription,
		ogImage: () => joinURL(runtimeConfig.public.siteUrl, '/images/og.jpg'),
	})

	useSchemaOrg([
		definePerson({
			name: () => `${viewer.value?.firstName} ${viewer.value?.lastName}`,
			logo: () => viewer.value?.avatar?.url || undefined,
			sameAs: () => viewer.value?.url || undefined,
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
