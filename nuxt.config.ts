import { generateSitemap } from './generateSitemap'

const globalConfig = {
	language: 'en-US',
	titleSeperator: '·',
}

export default defineNuxtConfig({
	extends: ['nuxt-seo-kit'],

	modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@nuxtjs/turnstile'],

	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
			siteUrl: process.env.SITE_URL,
		},
		public: {
			siteUrlPreview: '',
			wpHost: '',
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',

			// nuxt-seo-kit
			titleSeparator: globalConfig.titleSeperator,
			trailingSlash: true,
			language: globalConfig.language,
		},
	},

	// nuxt-link-checker
	linkChecker: {
		// failOn404: true,
	},

	// nuxt-simple-sitemap
	sitemap: {
		hostname: process.env.SITE_URL,
		defaults: {
			lastmod: new Date().toString(),
		},
		urls: generateSitemap,
	},

	// @nuxt/image-edge
	image: {
		provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
		domains: [process.env.NUXT_PUBLIC_WP_HOST as string, 'secure.gravatar.com'],
		screens: {
			'md': 768,
			'lg': 1024,
		},
	},

	// @nuxtjs/turnstile
	turnstile: {
		siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
	},

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

	app: {
		head: {
			link: [
				{
					rel: 'icon',
					href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
				},
			],
		},

		pageTransition: { name: 'page', mode: 'out-in' },
	},
})
