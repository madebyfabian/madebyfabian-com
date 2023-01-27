<template>
	<NuxtLayout>
		<NuxtLoadingIndicator :color="colors.sky[300]" :height="4" />
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
	import colors from 'tailwindcss/colors'
</script>
