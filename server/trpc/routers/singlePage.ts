import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { graphQLClient, gqlUntyped } from '@/server/utils/graphQLClient'

export const singlePageRouter = router({
	get: publicProcedure.input(z.object({ uri: z.string() })).query(({ input }) => {
		const query = gqlUntyped/* GraphQL */ `
			query SinglePage($uri: ID!) {
				page(id: $uri, idType: URI) {
					id
					title
					isFrontPage
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

		return graphQLClient.request(query as any, { uri: input.uri })
	}),
})
