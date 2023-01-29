<template>
	<div
		class="UIAvatar shrink-0 flex items-center justify-center shadow-inner outline-border overflow-hidden"
		:class="{ 'bg-gray-100': notFound }">
		<NuxtImg
			v-if="!notFound && url"
			:src="url || undefined"
			fit="cover"
			class="object-cover object-center"
			:alt="name || ''"
			:height="size"
			:width="size"
			:sizes="`lg:${size * 2}`" />

		<span v-else class="text-2xl">🙋</span>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		url?: string | null
		size: 32 | 128
		name?: string
		notFound?: boolean
	}>()

	const sizePx = computed(() => `${props.size}px`)
	const borderRadiusPx = computed(() => {
		if (props.size === 32) {
			return `12px`
		}
		if (props.size === 128) {
			return `24px`
		}
		return '0px'
	})
</script>

<style lang="postcss" scoped>
	.UIAvatar {
		height: v-bind(sizePx);
		width: v-bind(sizePx);
		border-radius: v-bind(borderRadiusPx);
	}
</style>
