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
		[
			'nuxt-basic-auth',
			{
				username: process.env.STAGING_USERNAME,
				password: process.env.STAGING_PASSWORD,
				enabled: process.env.STAGING_PASSWORD,
			},
		],
	],

	typescript: {
		shim: false,
	},

	runtimeConfig: {
		public: {
			gqlToken: '',
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
