export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo'],
	typescript: {
		shim: false,
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint: process.env.WP_GRAPHQL_BASE_URL as string,
			},
		},
	},
})
