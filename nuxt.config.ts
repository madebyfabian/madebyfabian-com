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

	runtimeConfig: {
		debug: {
			VERCEL_URL: process.env.VERCEL_URL,
			NUXT_VERCEL_URL: process.env.NUXT_VERCEL_URL,
			NUXT_PUBLIC_VERCEL_URL: process.env.NUXT_PUBLIC_VERCEL_URL,
		},
		public: {
			vercelUrl: '',
			debug: {
				VERCEL_URL: process.env.VERCEL_URL,
				NUXT_VERCEL_URL: process.env.NUXT_VERCEL_URL,
				NUXT_PUBLIC_VERCEL_URL: process.env.NUXT_PUBLIC_VERCEL_URL,
			},
			isPreview: process.env.VERCEL_URL === process.env.SITE_URL_PREVIEW,
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en-US',
			},
		},
	},
})
