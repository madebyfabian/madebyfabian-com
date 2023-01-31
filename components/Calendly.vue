<template>
	<ClientOnly>
		<div class="mt-8 mb-16 border-b pb-16">
			<div
				v-if="calendlyIsPermitted"
				class="p-6 shadow-border first:mt-0 last:mb-0 rounded-box bg-frost flex flex-col md:flex-row gap-6 md:items-center">
				<div class="flex-1">
					<h2 class="H3Like mb-2">Book a free call</h2>
					<p>Let's talk about your project and how I can help you.</p>
				</div>
				<button class="UIButton w-full md:w-auto" @click="handleOpen">Book now</button>
			</div>
			<CookieControlDenied v-else />
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
	const runtimeConfig = useRuntimeConfig()
	const calendly = useCalendly()

	const calendlyIsPermitted = computed(() => useIsCookiePermitted('calendly'))

	const handleOpen = () => {
		if (!process.client) return

		calendly.initPopupWidget({
			url: runtimeConfig.public.calendlyUrl,
		})
	}
</script>
