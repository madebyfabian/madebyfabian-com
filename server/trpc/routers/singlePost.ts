import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { gqlUntyped } from '@/server/utils/graphQLClient'
import { requestContent } from '@/server/utils/requestContent'
import { generateBlocksData } from '@/server/utils/generateBlocksData'

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
					slug
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

		const getData = async () => {
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
		}

		const data = await getData()
		const blocksData = await generateBlocksData({ blocksRaw: data?.post?.blocks, ctx })
		return {
			post: {
				...data?.post,
				blocks: blocksData.blocks,
			},
			mediaItems: blocksData.mediaItems,
		}
	}),
})
