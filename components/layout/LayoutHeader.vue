<template>
	<header class="LayoutHeader z-10 pt-4 pb-6 lg:py-14 mb-2 lg:mb-8 sticky">
		<div
			aria-hidden="true"
			class="LayoutHeader-underlay"
			:class="[
				'transition bg-gradient-to-b from-white to-white/75',
				'backdrop-blur-lg shadow-border',
				'absolute left-0 top-0 right-0 w-full',
				isSticky ? 'opacity-100' : 'opacity-0',
			]" />

		<div
			class="relative container grid grid-cols-2 grid-rows-[1fr_min] lg:items-center lg:grid-rows-1 lg:grid-cols-[1fr_0_1fr] h-full gap-x-6">
			<!-- Left Logo -->
			<div class="col-start-1 flex flex-1">
				<NuxtLink
					:to="{ name: 'index' }"
					title="Home Page"
					:class="[
						'relative flex mb-4 lg:m-0 group',
						'scale-110 lg:scale-100 origin-left text-2xl font-bold tracking-[-0.085rem]',
						'transition-opacity hover:opacity-75',
					]">
					<WPImage
						src="/wp-content/uploads/2023/02/logo-iconmark.svg"
						alt="Logo"
						class="absolute h-10 w-10 -top-0.5 -left-4 transition-transform group-hover:-translate-x-1"
						:path="'/wordpress-madebyfabian/'"
						eager />
					<span class="relative">
						<span>madebyfabian</span>
						<span class="text-accent-700 tracking-[-0.085rem]">.com</span>
					</span>
				</NuxtLink>
			</div>

			<!-- Center Main Menu -->
			<div class="">
				<LayoutMenu menuId="dGVybToxMg==" class="flex lg:justify-center relative z-10 max-h-[1.5rem]" />
			</div>

			<!-- Right Social Logos -->
			<div class="col-start-2 lg:col-start-3 row-start-1">
				<ul class="flex items-center justify-end gap-4 lg:gap-6 translate-y-1 lg:translate-y-0.5">
					<li v-for="logo of brandNavLogos" :key="logo.src">
						<NuxtLink
							:to="logo.src"
							class="transition hover:opacity-80 h-9 w-9 p-1 -m-1 block"
							external
							:title="logo.title">
							<img :src="logo.src" class="h-full w-full block" :alt="`${logo.title} Logo`" />
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { y } = useScroll(process.client ? window : undefined)
	const breakpoints = useTailwindBreakpoints()

	const isLg = computed(() => {
		return breakpoints.lg.value
	})

	const offset = computed(() => (isLg.value ? 28 : 0.1))
	const offsetPx = computed(() => `${offset.value}px`)
	const isSticky = computed(() => y.value >= offset.value)

	const brandNavLogos: { title: string; src: string; url: string }[] = [
		{
			title: 'GitHub',
			src: '/images/social-logos/github.svg',
			url: 'https://github.com/madebyfabian',
		},
		{
			title: 'Twitter',
			src: '/images/social-logos/twitter.svg',
			url: 'https://twitter.com/madebyfabian',
		},
		{
			title: 'Figma',
			src: '/images/social-logos/figma.svg',
			url: 'https://figma.com/@f',
		},
	]
</script>

<style lang="postcss" scoped>
	.LayoutHeader {
		top: calc(v-bind(offsetPx) * -1);
	}

	.LayoutHeader-underlay {
		height: 100%;
		top: calc(v-bind(offsetPx) * -1);
	}
</style>
