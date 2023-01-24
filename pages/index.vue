<template>
	<div class="container">
		<h1 class="text-4xl">Welcome to your page!</h1>
		<div v-if="data?.posts?.nodes">
			<NuxtLink
				v-for="item of data.posts.nodes"
				:key="item.id"
				:to="`/blog/${item.slug}`"
				class="block my-6 border bg-gray-100 rounded-xl p-4 max-w-xl">
				<h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
				<div class="flex gap-3">
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
			</NuxtLink>
			<pre>{{ data.posts }}</pre>
		</div>
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
