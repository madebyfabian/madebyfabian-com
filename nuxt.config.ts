import { generateSitemap } from './generateSitemap'
import { cookieConfig, generateTwicpicsConfig } from './config'
import { withHttps } from 'ufo'

const globalConfig = {
	language: 'en-US',
	titleSeperator: '·',
}

export default defineNuxtConfig({
	extends: ['nuxt-seo-kit'],

	modules: [
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/turnstile',
		'nuxt-typed-router',
		'@dargmuesli/nuxt-cookie-control',
		'nuxt-calendly',
		'@twicpics/components/nuxt3',
	],

	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
		},
		gqlHost: process.env.NUXT_GQL_HOST,
		gqlToken: process.env.NUXT_GQL_TOKEN,
		public: {
			siteUrlPreview: process.env.NUXT_PUBLIC_SITE_URL_PREVIEW,
			siteUrlProd: process.env.NUXT_PUBLIC_SITE_URL_PROD,
			wpHost: process.env.NUXT_PUBLIC_WP_HOST,
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',
			calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL,
			twicpicsDomain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
			twicpicsConfig: generateTwicpicsConfig([
				{
					path: '/wordpress-madebyfabian/',
					source: withHttps(process.env.NUXT_PUBLIC_WP_HOST as string),
				},
			]),

			// nuxt-seo-kit
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			siteName: 'Fabian Beer' /** @see https://github.com/harlan-zw/nuxt-seo-kit/issues/20 */,
			titleSeparator: globalConfig.titleSeperator,
			language: globalConfig.language,
		},
	},

	// nuxt-link-checker
	linkChecker: {
		failOn404: false,
	},

	// nuxt-simple-sitemap
	sitemap: {
		hostname: process.env.NUXT_PUBLIC_SITE_URL,
		defaults: {
			lastmod: new Date().toString(),
		},
		urls: generateSitemap,
	},

	// @twicpics/components/nuxt3
	twicpics: {
		domain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
	},

	// @nuxtjs/turnstile
	turnstile: {
		siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
	},

	// @dargmuesli/nuxt-cookie-control
	cookieControl: cookieConfig,

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
