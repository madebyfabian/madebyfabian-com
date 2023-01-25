<template>
	<div class="container mx-auto max-w-3xl">
		<UILink to="/" class="mb-12 block">&larr; Back to Home</UILink>
		<h1>{{ data.post?.title }}</h1>
		<UIArticleMetadata
			v-bind="{
				item: {
					date: data.post.dateGmt,
					author: data.post.author,
					tags: data.post.tags,
				},
			}" />
		<RichtextContainer :blocksRaw="data?.post?.blocks" :slugKey="slug" />
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()

	const query = gql`
		query SinglePost($slug: ID!) {
			post(id: $slug, idType: SLUG) {
				id
				title
				dateGmt
				excerpt(format: RAW)
				blocks {
					attributesJSON
					name
					innerBlocks {
						attributesJSON
						name
						innerBlocks {
							attributesJSON
							name
							innerBlocks {
								attributesJSON
								name
								innerBlocks {
									attributesJSON
									name
								}
							}
						}
					}
				}
				featuredImage {
					node {
						id
						sourceUrl
						altText
					}
				}
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
	`

	const slug = computed(() => route.params.slug as string)

	const { data, error } = await useAsyncQuery<any>(query, {
		slug: slug.value,
	})

	if (!data.value?.post || error.value) {
		throw createError({ statusCode: 404, message: 'Blog post not found' })
	}

	useSeoMeta({
		title: data.value.post?.title,
		description: data.value.post?.excerpt,
		ogImage: data.value.post?.featuredImage?.node?.sourceUrl,
	})
</script>
