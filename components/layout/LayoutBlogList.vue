<template>
	<div v-if="data?.posts?.nodes" class="LayoutBlogList mt-12">
		<NuxtLink
			v-for="item of data.posts.nodes"
			:key="item.id"
			:to="`/blog/${item.slug}`"
			class="my-6 border rounded-xl flex flex-col md:flex-row overflow-hidden">
			<div class="w-full h-36 md:h-auto md:w-56 shrink-0 bg-gray-100 flex items-center justify-center">
				<img
					class="h-full w-full object-cover object-center"
					v-if="item?.featuredImage?.node"
					:src="item.featuredImage.node.sourceUrl || undefined"
					:alt="item.featuredImage.node.altText || item.title || undefined" />
				<span v-else class="text-3xl">🏡</span>
			</div>

			<div class="p-6">
				<h2 class="text-2xl font-bold mb-2">{{ item.title }}</h2>
				<p class="my-2">
					<span v-text="item.excerpt"></span>
				</p>

				<UIArticleMetadata
					v-bind="{
						item: {
							date: item.dateGmt,
							author: item.author,
							tags: item.tags,
						},
					}" />
			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
	import { graphql } from '@/gql'

	const query = graphql(`
		query ListPosts {
			posts {
				nodes {
					id
					title
					dateGmt
					slug
					excerpt(format: RAW)
					featuredImage {
						node {
							id
							sourceUrl
							altText
						}
					}
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
	`)

	const { data, error } = await useAsyncQuery(query)
	if (error.value) {
		throw createError({ statusCode: 500, message: 'Error fetching posts in blog list' })
	}
</script>
