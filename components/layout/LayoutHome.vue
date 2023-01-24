<template>
	<div v-if="data?.posts?.nodes">
		<NuxtLink
			v-for="item of data.posts.nodes"
			:key="item.id"
			:to="`/blog/${item.slug}`"
			class="my-6 border rounded-xl flex flex-col md:flex-row overflow-hidden">
			<div class="w-full h-36 md:h-auto md:w-56 shrink-0 bg-gray-100 flex items-center justify-center">
				<img
					class="h-full w-full object-cover object-center"
					v-if="item?.featuredImage?.node"
					:src="item.featuredImage.node.sourceUrl"
					:alt="item.featuredImage.node.altText || item.title" />
				<span v-else class="text-3xl">🏡</span>
			</div>

			<div class="p-6">
				<h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
				<p class="my-2">
					<span v-text="item.excerpt"></span>
				</p>
				<div class="flex gap-3 flex-wrap">
					<p v-if="item.date" class="text-gray-500">From {{ formatDate({ date: item.date }) }}</p>
					<p v-if="item.author?.node.name">By {{ item.author?.node.name }}</p>
					<ul v-if="item.tags?.edges.length">
						<li
							v-for="tag of item.tags.edges"
							:key="tag.node.id"
							class="text-gray-500 underline underline-offset-2 decoration-gray-300">
							# {{ tag.node.name }}
						</li>
					</ul>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
	const { data } = await useAsyncGql({
		operation: 'Posts',
	})

	const formatDate = ({ date }: { date: string }) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})
	}
</script>
