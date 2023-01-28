<template>
	<LayoutPage hasH1 :uri="uri" />
</template>

<script setup lang="ts">
	const route = useRoute('uri')
	const uri = computed(() => route.fullPath)
</script>
