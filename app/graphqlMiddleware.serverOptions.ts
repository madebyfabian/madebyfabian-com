import { defineGraphqlServerOptions } from '#graphql-server-options'

export default defineGraphqlServerOptions({
	serverFetchOptions: () => {
		return {
			headers: {
				'Authorization': process.env.NUXT_GQL_TOKEN || '',
			},
		}
	},
})
