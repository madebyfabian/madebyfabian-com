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
