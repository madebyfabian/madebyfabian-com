import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { gqlUntyped } from '@/server/utils/graphQLClient'
import { requestContent } from '@/server/utils/requestContent'

export const singlePostRouter = router({
	get: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
		const query = gqlUntyped/* GraphQL */ `
			query SinglePost($slug: ID!) {
				post(id: $slug, idType: SLUG) {
					id
					title
					dateGmt
					status
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

		const getPreviewInput = () => {
			return `${input.slug}-2`
		}

		const content = await requestContent({
			query,
			headers: ctx.headers,
			input: { slug: input.slug },
			previewInput: { slug: getPreviewInput() },
		})

		if (content.previewData?.post) return content.previewData
		if (content.data?.post.status === 'publish') {
			return content.data
		}
	}),
})
