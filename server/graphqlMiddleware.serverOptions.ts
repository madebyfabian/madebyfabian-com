import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'

export default defineGraphqlServerOptions({
	serverFetchOptions: () => {
		return {
			headers: {
				'Authorization': process.env.NUXT_GQL_TOKEN || '',
			},
		}
	},
})
