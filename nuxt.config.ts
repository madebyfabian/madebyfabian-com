import { generateSitemap } from './generateSitemap'

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'nuxt-graphql-client', 'nuxt-simple-sitemap'],

	typescript: {
		shim: false,
	},

	'graphql-client': {
		/**
		 * @see https://github.com/Diizzayy/nuxt-graphql-client/issues/298
		 * We had to disable the codegen, so this is a temporary replacement.
		 */
		codegen: false,
		clients: {
			default: {
				host: process.env.GQL_HOST as string,
				retainToken: process.env.NODE_ENV === 'development',
			},
		},
	},

	sitemap: {
		hostname: process.env.SITE_URL,
		defaults: {
			lastmod: new Date().toString(),
		},
		urls: generateSitemap,
	},
	routeRules: {
		'/': { index: false, swr: true },
		'/**': { swr: true },
	},
})
