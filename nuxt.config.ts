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
				domains: [process.env.NUXT_PUBLIC_WP_HOST, 'secure.gravatar.com'],
				screens: {
					'md': 768,
					'lg': 1024,
				},
			},
		],
		[
			'@nuxtjs/turnstile',
			{
				siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
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
		externals: {
			traceInclude: ['./node_modules/vue/server-renderer'],
		},
	},

	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
		},
		public: {
			siteUrlPreview: '',
			wpHost: '',
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',
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

		pageTransition: { name: 'page', mode: 'out-in' },
	},

	routeRules: {
		// Do not include the index route in the sitemap. (Because it would be duplicated),
		'/': { index: false },
	},
})
