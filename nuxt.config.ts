export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'nuxt-graphql-client', '@nuxt/image-edge'],

	typescript: {
		shim: false,
	},

	'graphql-client': {
		/**
		 * @see https://github.com/Diizzayy/nuxt-graphql-client/issues/298
		 * We had to disable the codegen, so this is a temporary replacement.
		 */
		codegen: false,
	},

	image: {
		provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
		domains: [process.env.WP_HOST as string],
	},
})
