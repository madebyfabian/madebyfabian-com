import { generateSitemap } from './generateSitemap'

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		[
			'nuxt-schema-org',
			{
				host: process.env.SITE_URL,
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
			'@nuxt/image-edge',
			{
				provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
				domains: [process.env.NUXT_PUBLIC_IMAGE_DOMAIN],
				screens: {
					'md': 768,
					'lg': 1024,
				},
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
		public: {
			siteUrlPreview: '',
			isProduction: process.env.NODE_ENV === 'production',
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'en-US',
			},
			link: [
				{
					rel: 'icon',
					href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
				},
			],
		},
	},

	routeRules: {
		// Do not include the index route in the sitemap. (Because it would be duplicated),
		'/': { index: false },
		'/_vercel/image/**': { headers: { 'cache-control': `public, max-age=${60 * 60 * 24}` } },
	},
})
