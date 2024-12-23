import { z } from 'zod'

export default defineEventHandler(async event => {
	const input = await getValidatedQuery(event, z.object({ uri: z.string() }).parse)

	const query = /* GraphQL */ `
		query SinglePage($uri: ID!) {
			page(id: $uri, idType: URI) {
				id
				title
				isFrontPage
				status
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
	if (!data) return { page: null, tocEntriesList: [], mediaItems: [] }
	const blocksData = await generateBlocksData({ blocksRaw: data?.page?.blocks })
	return {
		page: {
			...data?.page,
			blocks: blocksData.blocks,
		},
		tocEntriesList: blocksData.tocEntriesList,
		mediaItems: blocksData.mediaItems,
	}
})
