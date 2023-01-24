<template>
	<div class="container">
		<h1 class="text-4xl">Welcome to your page!</h1>
		<div v-if="data">
			<article
				v-for="item of data.posts.nodes"
				:key="item.id"
				class="my-6 border bg-gray-100 rounded-xl p-4 max-w-md">
				<h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
				<p v-if="item.date" class="text-gray-500">
					Posted on
					{{
						new Date(item.date).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						})
					}}
				</p>
			</article>
			<pre>{{ data.posts }}</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Post } from '@/types/gen/graphql'

	const query = gql`
		{
			posts {
				nodes {
					id
					title
					content
					date
					slug
					tags {
						edges {
							node {
								id
								name
							}
						}
					}
					author {
						node {
							name
						}
					}
				}
			}
		}
	`

	type Res = {
		posts: {
			nodes: Pick<Post, 'id' | 'title' | 'date'>[]
		}
	}

	const { data } = await useAsyncQuery<Res>(query, { first: 10 })
</script>
