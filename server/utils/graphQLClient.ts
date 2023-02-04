import { GraphQLClient, gql as gqlUntyped } from 'graphql-request'
export { graphql as gql } from '@/graphql'
const runtimeConfig = useRuntimeConfig()

// We need this sometimes because some queries have an infinite number of innerBlocks,
// and the type generator gets confused.
export { gqlUntyped }

export const graphQLClient = new GraphQLClient(runtimeConfig.gqlHost, {
	headers: {
		authorization: runtimeConfig.gqlToken,
	},
})
