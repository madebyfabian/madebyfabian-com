<template>
	<header class="LayoutHeader z-10 py-6 md:py-14 mb-12 md:sticky">
		<div
			aria-hidden="true"
			class="LayoutHeader-underlay hidden md:block absolute left-0 top-0 right-0 w-full transition"
			:class="{ 'bg-frost-2 backdrop-blur-md shadow-border': isSticky }"></div>
		<div
			class="relative container flex flex-col md:flex-row justify-between md:items-center h-full gap-x-6 gap-y-2">
			<div class="hidden md:flex md:order-1 flex-1 w-full md:w-fit">
				<LayoutMenu menuId="dGVybTo5" class="flex gap-x-4 lg:gap-x-7 gap-y-2 w-full flex-wrap" />
			</div>

			<NuxtLink
				:to="{ name: 'index' }"
				title="Home Page"
				class="mb-1 md:m-0 text-2xl md:order-2 font-bold tracking-[-0.085rem] block relative transition-opacity hover:opacity-75">
				<NuxtImg
					src="/images/logo.svg"
					alt="Logo"
					:height="40"
					:width="40"
					:style="{ top: '-2px', left: '-16px' }"
					class="absolute" />
				<span class="relative">madebyfabian<span class="text-accent-700 tracking-[-0.085rem]">.com</span></span>
			</NuxtLink>

			<div class="hidden md:flex md:order-3 flex-1 w-full md:w-fit">
				<LayoutMenu
					menuId="dGVybToxMQ=="
					class="flex gap-x-4 lg:gap-x-7 gap-y-2 justify-end w-full flex-wrap" />
			</div>

			<!-- Mobile only -->
			<div class="LayoutHeader-mobile md:invisible md:sr-only overflow-x-scroll md:overflow-hidden -mx-5">
				<LayoutMenu menuId="dGVybTo3" class="flex gap-x-5 w-full px-5 pr-5" />
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { y } = useScroll(process.client ? window : undefined)
	const offset = 28
	const offsetPx = `${offset}px`
	const offset2xPx = `${offset * 2}px`
	const isSticky = computed(() => y.value >= offset)
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
