const gqlHost = process.env.NUXT_GQL_HOST || ''
const gqlToken = process.env.NUXT_GQL_TOKEN || ''

/**
 * Helper function to make a GraphQL query,
 * which just uses fetch and not any typed GraphQL client with schema and stuff.
 * This is useful for
 * - Making queries that break the codegen (e.g. recursive queries)
 * - Edge functions not having access to the codegen's generated types
 */
export const graphQLQuery = async <T extends unknown>(params: {
	query: string
	variables?: Record<string, any>
	fetch: typeof fetch
}) => {
	const gqlRes = await fetch(gqlHost, {
		method: 'POST',
		headers: {
			'authorization': gqlToken,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: params.query,
			variables: params.variables ?? {},
		}),
	})

	return ((await gqlRes.json())?.data as T) || null
}
