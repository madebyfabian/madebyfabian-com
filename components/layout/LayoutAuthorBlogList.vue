<template>
	<div class="LayoutAuthorBlogList container max-w-3xl">
		<div class="flex flex-col items-center">
			<UIAvatar
				:url="user?.avatar?.url"
				:size="128"
				:name="user?.name || ''"
				:notFound="!user?.avatar?.foundAvatar" />
			<h1 class="mt-10 mb-4">{{ user?.name }}</h1>
			<ul class="flex">
				<li v-for="(roleNode, key) of user?.roles?.edges" :key="roleNode.node.id">
					<span>{{ roleNode.node.displayName }}</span>
					<span v-if="key + 1 !== user?.roles?.edges.length">,&nbsp;</span>
				</li>
			</ul>
		</div>

		<div class="mt-12">
			<h2>My posts</h2>
		</div>

		<LayoutBlogList
			:posts="(user?.posts?.edges?.map(edge => edge.node) as any)"
			:uniqueKey="`LayoutAuthorBlogList:${authorId}`" />
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		authorId: string
	}>()

	const { data, error } = await useAsyncData(`AuthorDetails:${props.authorId}`, () =>
		useGraphqlQuery('AuthorDetails', { id: props.authorId })
	)
	const user = computed(() => data.value?.data.user)
	if (!user || error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching author details', fatal: true })
	}

	useSeoMeta({
		title: `Posts by ${user.value?.name}`,
	})
</script>
