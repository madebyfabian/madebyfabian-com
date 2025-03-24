import { z } from 'zod'

export default defineEventHandler(async event => {
	const input = await getValidatedQuery(event, z.object({ uri: z.string() }).parse)

	const query = /* GraphQL */ `
		query SinglePost($uri: ID!) {
			post(id: $uri, idType: URI) {
				id
				title
				dateGmt
				status
				excerpt(format: RAW)
				author {
					node {
						name
						databaseId
						avatar(size: 360) {
							url
							foundAvatar
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
				uri
				tags {
					edges {
						node {
							id
							name
						}
					}
				}
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
			}
		}
	`

	const data = await graphQLQuery<any>({ query, variables: input, fetch: $fetch as any })
	if (!data?.post) return { page: null, mediaItems: [] }
	const blocksData = await generateBlocksData({ blocksRaw: data?.post?.blocks })
	return {
		post: {
			...data?.post,
			blocks: blocksData.blocks,
		},
		tocEntriesList: blocksData.tocEntriesList,
		mediaItems: blocksData.mediaItems,
	}
})
