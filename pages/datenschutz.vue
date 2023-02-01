<template>
	<LayoutPage hasH1 :uri="uri" />
</template>

<script lang="ts" setup>
	const route = useRoute('datenschutz')
	const uri = computed(() => route.fullPath)
</script>
