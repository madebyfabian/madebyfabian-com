<template>
	<div class="UIAvatar shrink-0 shadow-border-and-inner overflow-hidden relative safari-overflow-fix">
		<NuxtImg :src="url || undefined" :width="size" :height="size" :alt="name || ''" />
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
