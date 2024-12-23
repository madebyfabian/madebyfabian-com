<template>
	<div class="BgBlur overflow-hidden" aria-hidden="true">
		<div
			:class="{
				'-top-[10vh] -left-[33vh]': props.position === 'topLeft',
				'-bottom-[10vh] -right-[33vh] rotate-90	': props.position === 'bottomRight',
			}"
			class="container fixed z-0 select-none pointer-events-none">
			<NuxtImg
				src="https://wp.madebyfabian.com/wp-content/uploads/2023/02/blur.png"
				alt=""
				class="h-[75vh] w-full object-contain" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		position: 'topLeft' | 'bottomRight'
	}>()
</script>
