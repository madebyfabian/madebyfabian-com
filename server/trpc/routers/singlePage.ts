import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { gqlUntyped } from '@/server/utils/graphQLClient'
import { requestContent } from '@/server/utils/requestContent'
import { removeTrailingSlash } from '@/utils/removeTrailingSlash'

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

		const getPreviewInput = () => {
			const withoutTrailingSlash = removeTrailingSlash(input.uri)
			return `${withoutTrailingSlash}-2/`
		}

		return requestContent({
			query,
			input: { uri: input.uri },
			previewInput: { uri: getPreviewInput() },
		})
	}),
})
