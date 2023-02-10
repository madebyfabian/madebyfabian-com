<template>
	<section v-if="data?.length" class="LayoutProjectList my-6 flex flex-col gap-8">
		<LayoutProjectsItem v-for="project of data" :project="project" />
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
