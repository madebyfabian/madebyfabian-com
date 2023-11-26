<template>
	<section v-if="projects?.length" class="LayoutProjectList my-8 lg:my-12 flex flex-col gap-12 lg:gap-16">
		<LayoutProjectsItem v-for="(project, key) of projects" :project="project" :index="key" />
	</section>
</template>

<script lang="ts" setup>
	const { data, error } = await useAsyncData(() => useGraphqlQuery('ListProjects'))
	const projects = computed(() => data?.value?.data?.projects?.nodes)
	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error displaying prpjects in project list', fatal: true })
	}
</script>
