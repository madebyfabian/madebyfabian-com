import { withHttps } from 'ufo'
import { generateSitemap } from './generateSitemap'
import { cookieConfig } from './config'

export default defineNuxtConfig({
	extends: ['nuxt-wordpress'],

	experimental: {
		typedPages: true,
		componentIslands: true,
		inlineRouteRules: true,
	},

	typescript: {
		shim: false,
	},

	nitro: {
		externals: {
			traceInclude: ['./node_modules/vue/server-renderer'],
		},

		// @nuxtseo/module
		prerender: {
			crawlLinks: true,
			routes: ['/'],
		},
	},

	modules: [
		'@nuxtjs/seo',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/turnstile',
		'@dargmuesli/nuxt-cookie-control',
		'nuxt-graphql-middleware',
		'nuxt-shiki',
	],

	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
		},
		gqlHost: process.env.NUXT_GQL_HOST,
		gqlToken: process.env.NUXT_GQL_TOKEN,
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			siteUrlProd: process.env.NUXT_PUBLIC_SITE_URL_PROD,
			wpHost: process.env.NUXT_PUBLIC_WP_HOST,
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',
			calcomUrl: process.env.NUXT_PUBLIC_CALCOM_URL,
			openpanelClientId: process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID,

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
			titleTemplate: `${process.env.NODE_ENV === 'development' ? '⚙️ ' : ''}%s %separator %siteName`,
			templateParams: {
				separator: '·',
			},
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

	// @nuxtseo/module
	site: {
		siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
		siteName: 'Fabian Beer',
		siteDescription:
			'Hej! I am Fabian, a visual product designer and frontend developer, creating high-quality web experiences for your unique needs.',
		defaultLocale: 'en-US',
	},

	// @nuxtseo/module->nuxt-og-omage
	ogImage: {
		enabled: false,
	},

	// nuxt-wordpress->@twicpics/components/nuxt3
	twicpics: {
		domain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
	},

	// nuxt-link-checker
	linkChecker: {
		enabled: false,
		failOnError: false,
	},

	// @nuxtjs/sitemap
	sitemap: {
		autoLastmod: true,
		exclude: ['/impressum', '/datenschutz'],
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

	// nuxt-shiki
	shiki: {
		theme: 'github-light',
		lang: 'typescript',
		themes: [],
		langs: ['typescript', 'html', 'bash', 'php', 'graphql'],
	},
})
