import { withoutTrailingSlash } from 'ufo'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const singlePageRouter = router({
	get: publicProcedure.input(z.object({ uri: z.string() })).query(async ({ ctx, input }) => {
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

		const getData = async () => {
			const getPreviewInput = () => {
				const url = withoutTrailingSlash(input.uri)
				return url === '/' ? '/home-2/' : `${url}-2/`
			}

			const content = await requestContent({
				headers: ctx.headers,
				query,
				input: { uri: input.uri },
				previewInput: { uri: getPreviewInput() },
			})

			if (!content.data?.page) return null
			if (content.previewData?.page) return content.previewData
			if (content.data?.page?.status === 'publish') {
				return content.data
			}
		}

		const data = await getData()
		if (!data) return { page: null, mediaItems: [] }
		const blocksData = await generateBlocksData({ blocksRaw: data?.page?.blocks, ctx })
		return {
			page: {
				...data?.page,
				blocks: blocksData.blocks,
			},
			tocEntriesList: blocksData.tocEntriesList,
			mediaItems: blocksData.mediaItems,
		}
	}),
})
