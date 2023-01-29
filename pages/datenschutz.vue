<template>
	<LayoutPage hasH1 :uri="uri"> X </LayoutPage>
</template>

<script lang="ts" setup>
	const route = useRoute('datenschutz')
	const uri = computed(() => route.fullPath)
</script>
