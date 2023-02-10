<template>
	<section v-if="data?.length" class="LayoutProjectList divide-y-2">
		<LayoutProjectsItem v-for="(project, key) of data" :project="project" :index="key" />
	</section>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()

	const { data, error } = await useAsyncData(async () => {
		const { data: queryData, error: queryError } = await $client.general.listProjects.useQuery()
		if (queryError.value) {
			throw createError({ statusCode: 500, message: 'Error fetching projects in project list', fatal: true })
		}

		return queryData.value?.projects?.nodes
	})

	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error displaying prpjects in project list', fatal: true })
	}
</script>
