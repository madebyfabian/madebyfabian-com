import { generateSitemap } from './generateSitemap'

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
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

	build: {
		transpile: ['trpc-nuxt'],
	},

	nitro: {
		preset: 'vercel',
	},

	runtimeConfig: {
		public: {
			siteUrlPreview: '',
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en-US',
			},
		},
	},

	// Do not include the index route in the sitemap. (Because it would be duplicated),
	routeRules: {
		'/': { index: false },
	},
})
