<template>
	<LayoutPage :uri="uri" />
</template>

<script lang="ts" setup>
	const route = useRoute('about')
	const uri = computed(() => route.fullPath)
</script>
