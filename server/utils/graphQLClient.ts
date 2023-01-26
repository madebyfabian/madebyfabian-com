import { GraphQLClient, gql as gqlUntyped } from 'graphql-request'
export { graphql as gql } from '@/types/gen/graphql'

// We need this sometimes because some queries have an infinite number of innerBlocks,
// and the type generator gets confused.
export { gqlUntyped }

const endpoint = 'https://headlesstest-7dkcm5v4mp.live-website.com/graphql' //  process.env.GQL_HOST as string

export const graphQLClient = new GraphQLClient(endpoint, {
	headers: {
		authorization: 'Basic dXNlcjI0MDQ0MDI1OTczMzIyOkxraHkgdWs5eSBWVkpNIGVTSkMgc2NJSyBwODlh', //  process.env.GQL_TOKEN as string,
	},
})
