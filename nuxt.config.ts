import { withHttps } from 'ufo'
import { generateSitemap } from './generateSitemap'
import { cookieConfig } from './config'

export default defineNuxtConfig({
	extends: ['nuxt-wordpress', 'nuxt-seo-kit'],

	experimental: {
		typedPages: true,
	},

	modules: [
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/turnstile',
		'@dargmuesli/nuxt-cookie-control',
		'nuxt-calendly',
		'nuxt-graphql-middleware',
	],

	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
		},
		gqlHost: process.env.NUXT_GQL_HOST,
		gqlToken: process.env.NUXT_GQL_TOKEN,
		public: {
			siteUrlProd: process.env.NUXT_PUBLIC_SITE_URL_PROD,
			wpHost: process.env.NUXT_PUBLIC_WP_HOST,
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',
			calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL,

			// nuxt-seo-kit
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			siteName: 'Fabian Beer',
			siteDescription:
				'Hej! I am Fabian, a visual product designer and frontend developer, creating high-quality web experiences for your unique needs.',
			titleSeperator: '·',
			language: 'en-US',

			// nuxt-wordpress
			wordpress: {
				baseUrl: withHttps(process.env.NUXT_PUBLIC_WP_HOST || ''),
				twicpicsDomain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
				twicpicsPaths: [
					{
						path: '/wordpress-madebyfabian/',
						source: withHttps(process.env.NUXT_PUBLIC_WP_HOST || ''),
					},
					{
						path: '/gravatar/',
						source: 'https://secure.gravatar.com/',
					},
				],
			},
		},
	},

	app: {
		head: {
			titleTemplate: `${process.env.NODE_ENV === 'development' ? '⚙️ ' : ''}%s %titleSeperator %siteName`,
			link: [
				// Favicons
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon-16x16.png',
					sizes: '16x16.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon-32x32.png',
					sizes: '32x32.png',
				},
				{
					rel: 'apple-touch-icon',
					href: '/apple-touch-icon.png',
					sizes: '180x180',
				},
			],
		},

		pageTransition: { name: 'page', mode: 'out-in' },
	},

	css: ['prismjs/themes/prism-twilight.css'],

	// nuxt-wordpress->@twicpics/components/nuxt3
	twicpics: {
		domain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
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

	// @nuxtjs/turnstile
	turnstile: {
		siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
	},

	// @dargmuesli/nuxt-cookie-control
	cookieControl: cookieConfig,

	// nuxt-graphql-middleware
	graphqlMiddleware: {
		graphqlEndpoint: process.env.NUXT_GQL_HOST,
		codegenConfig: {
			// disabled so it generates every type from the schema (not only the ones used in operations).
			onlyOperationTypes: false,
		},
		codegenSchemaConfig: {
			urlSchemaOptions: {
				headers: {
					'Authorization': process.env.NUXT_GQL_TOKEN || '',
				},
			},
		},
	},

	typescript: {
		shim: false,
	},

	build: {
		transpile: ['prismjs'],
	},

	nitro: {
		externals: {
			traceInclude: ['./node_modules/vue/server-renderer'],
		},
	},
})
