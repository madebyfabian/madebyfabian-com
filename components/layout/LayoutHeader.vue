<template>
	<header class="LayoutHeader z-10 py-6 lg:py-14 mb-12 sticky">
		<div
			aria-hidden="true"
			class="LayoutHeader-underlay"
			:class="[
				'transition bg-gradient-to-b from-white to-white/80 lg:to-white/60',
				'backdrop-blur-lg shadow-border',
				'absolute left-0 top-0 right-0 w-full',
				isSticky ? 'opacity-100' : 'opacity-0',
			]" />

		<div class="relative container grid grid-cols-1 lg:grid-cols-[1fr_0_1fr] h-full gap-x-6">
			<!-- Desktop only, left side -->

			<LayoutMenu menuId="dGVybTo5" class="hidden lg:flex lg:w-fit flex-wrap" />

			<!-- Logo, Desktop centered, mobile left -->
			<div class="flex lg:justify-center">
				<NuxtLink
					:to="{ name: 'index' }"
					title="Home Page"
					:class="[
						'relative flex mb-4 lg:m-0',
						'scale-110 lg:scale-125 origin-left lg:origin-center',
						'text-2xl font-bold tracking-[-0.085rem]',
						'transition-opacity hover:opacity-75',
					]">
					<UIImage
						src="/wp-content/uploads/2023/02/logo.svg"
						alt="Logo"
						class="absolute h-10 w-10 -top-0.5 -left-4"
						:path="'wordpress-madebyfabian'"
						eager />
					<span class="relative"
						>madebyfabian<span class="text-accent-700 tracking-[-0.085rem]">.com</span></span
					>
				</NuxtLink>
			</div>

			<!-- Desktop only, right side -->
			<LayoutMenu menuId="dGVybToxMQ==" class="hidden lg:flex w-full justify-end flex-wrap" />

			<!-- Mobile only -->
			<div class="LayoutHeader-mobile lg:invisible lg:sr-only overflow-x-scroll lg:overflow-hidden -mx-5 -mb-5">
				<LayoutMenu menuId="dGVybTo3" class="flex w-full px-5 pr-5" />
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
	const offset2xPx = computed(() => `${offset.value * 2}px`)
	const isSticky = computed(() => y.value >= offset.value)
</script>

<style lang="postcss" scoped>
	.LayoutHeader {
		top: calc(v-bind(offsetPx) * -1);
	}

	.LayoutHeader-underlay {
		height: calc(100% - v-bind(offset2xPx));
		top: v-bind(offsetPx);
	}

	.LayoutHeader-mobile {
		/* Fade out */
		--width-fade-out: 20px;
		mask-image: linear-gradient(
			to right,
			transparent 0,
			#000 var(--width-fade-out),
			#000 calc(100% - var(--width-fade-out)),
			transparent 100%
		);

		/* Hide horizontal scrollbar */
		padding-bottom: 1rem;
		clip-path: inset(0 0 1rem 0);

		:deep(> ul > *) {
			&:last-child {
				@apply pr-5;
			}
		}
	}
</style>
