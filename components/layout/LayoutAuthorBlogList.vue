<template>
	<div class="LayoutAuthorBlogList container max-w-3xl">
		<div class="flex flex-col items-center">
			<UIAvatar
				:url="data?.user?.avatar?.url"
				:size="128"
				:name="data?.user?.name || ''"
				:notFound="!data?.user?.avatar?.foundAvatar" />
			<h1 class="mt-10 mb-4">{{ data?.user?.name }}</h1>
			<ul class="flex">
				<li v-for="(roleNode, key) of data?.user?.roles?.edges" :key="roleNode.node.id">
					<span>{{ roleNode.node.displayName }}</span>
					<span v-if="key + 1 !== data?.user?.roles?.edges.length">,&nbsp;</span>
				</li>
			</ul>
		</div>

		<div class="mt-12">
			<h2>My posts</h2>
		</div>

		<LayoutBlogList
			:posts="(data?.user?.posts?.edges?.map(edge => edge.node) as any)"
			:uniqueKey="`LayoutAuthorBlogList:${authorId}`" />
	</div>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()

	const props = defineProps<{
		authorId: string
	}>()

	const { data, error } = await $client.general.authorDetails.useQuery({
		authorId: props.authorId,
	})
	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching author details', fatal: true })
	}

	useSeoMeta({
		title: `Posts by ${data.value?.user?.name}`,
	})
</script>
