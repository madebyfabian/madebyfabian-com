import { generateSitemap } from './generateSitemap'

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		[
			'@nuxtjs/apollo',
			{
				clients: {
					default: {
						httpEndpoint: process.env.GQL_HOST,
						authType: 'Basic',
						proxyCookies: process.env.NODE_ENV === 'development',
					},
				},
			},
		],
		[
			'nuxt-simple-sitemap',
			{
				hostname: process.env.SITE_URL,
				defaults: {
					lastmod: new Date().toString(),
				},
				urls: generateSitemap,
			},
		],
	],

	typescript: {
		shim: false,
	},

	runtimeConfig: {
		public: {
			GQL_TOKEN: process.env.NODE_ENV === 'development' ? process.env.GQL_TOKEN : '',
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en-US',
			},
		},
	},

	routeRules: {
		'/': { index: false, static: true },
		'/**': { static: true },
	},
})
