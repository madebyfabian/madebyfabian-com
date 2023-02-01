<template>
	<div>
		<p class="PSmallLike mt-6 border-t pt-4 text-gray-500">
			By {{ props.actionLabel }}, you agree to the
			<NuxtLink :to="{ name: 'datenschutz' }" target="_blank" class="UILink">Privacy Policy</NuxtLink>.
		</p>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		actionLabel: string
	}>()
</script>
