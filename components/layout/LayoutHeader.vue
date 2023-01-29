<template>
	<header class="LayoutHeader z-10 py-6 md:py-14 mb-8 md:sticky" :style="{ top: `-${offset}px` }">
		<div
			aria-hidden="true"
			class="hidden md:block absolute left-0 top-0 right-0 w-full transition"
			:style="{ height: `calc(100% - ${offset * 2}px)`, top: `${offset}px` }"
			:class="{ 'bg-frost-2 backdrop-blur-md outline-border': isSticky }"></div>
		<div
			class="relative container flex flex-col md:flex-row justify-between md:items-center h-full gap-x-12 gap-y-2">
			<div class="hidden md:flex md:order-1 flex-1 w-full md:w-fit">
				<LayoutMenu menuId="dGVybTo5" class="flex gap-x-4 md:gap-x-7 gap-y-2 w-full flex-wrap" />
			</div>

			<NuxtLink
				:to="{ name: 'index' }"
				class="mb-1 md:m-0 text-2xl md:order-2 font-bold tracking-[-0.085rem] block">
				madebyfabian<span class="text-accent-700 tracking-[-0.085rem]">.com</span>
			</NuxtLink>

			<div class="hidden md:flex md:order-3 flex-1 w-full md:w-fit">
				<LayoutMenu
					menuId="dGVybToxMQ=="
					class="flex gap-x-4 md:gap-x-7 gap-y-2 justify-end w-full flex-wrap" />
			</div>

			<!-- Mobile only -->
			<div class="LayoutHeader-mobile md:sr-only overflow-x-scroll md:overflow-hidden -mx-5">
				<LayoutMenu menuId="dGVybTo3" class="flex gap-x-5 w-full px-5 pr-5" />
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { y } = useScroll(process.client ? window : undefined)
	const offset = 28
	const isSticky = computed(() => y.value >= offset)
</script>

<style lang="postcss" scoped>
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
