import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { graphQLClient, gqlUntyped } from '@/server/utils/graphQLClient'

export const singlePostRouter = router({
	get: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => {
		const query = gqlUntyped/* GraphQL */ `
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

		return graphQLClient.request(query as any, { slug: input.slug })
	}),
})
