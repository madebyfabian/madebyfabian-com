export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'nuxt-graphql-client'],
	typescript: {
		shim: false,
	},
	runtimeConfig: {
		public: {
			GQL_HOST: process.env.GQL_HOST,
		},
	},
})
