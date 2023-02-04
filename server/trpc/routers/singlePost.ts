import { withoutTrailingSlash } from 'ufo'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const singlePostRouter = router({
	get: publicProcedure.input(z.object({ uri: z.string() })).query(async ({ ctx, input }) => {
		const query = gqlUntyped/* GraphQL */ `
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

		const getData = async () => {
			const getPreviewInput = () => {
				const url = withoutTrailingSlash(input.uri)
				return `${url}-2/`
			}

			const content = await requestContent({
				query,
				headers: ctx.headers,
				input: { uri: input.uri },
				previewInput: { uri: getPreviewInput() },
			})

			if (!content.data?.post) return null
			if (content.previewData?.post) return content.previewData
			if (content.data?.post?.status === 'publish') {
				return content.data
			}
		}

		const data = await getData()
		if (!data) return { page: null, mediaItems: [] }
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
