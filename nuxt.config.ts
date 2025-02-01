import { generateSitemap } from './generateSitemap'
import { breakpoints } from './tailwind.config'

/** @temp fix @see https://github.com/pi0/nuxt-shiki/issues/41#issuecomment-2401330248 */
import { rollup as unwasm } from 'unwasm/plugin'

export default defineNuxtConfig({
	compatibilityDate: '2024-12-23',
	experimental: {
		typedPages: true,
		componentIslands: true,
		inlineRouteRules: true,
	},
	typescript: {
		shim: false,
	},
	nitro: {
		experimental: {
			/** @see https://github.com/pi0/nuxt-shiki/issues/29 inject onig.wasm warning */
			wasm: true,
		},
		/** @see https://github.com/pi0/nuxt-shiki/issues/45 cannot find module core.mjs */
		externals: { traceInclude: ['./node_modules/vue/server-renderer', 'shiki/dist/core.mjs'] },

		// @nuxtseo/module
		prerender: {
			crawlLinks: true,
			routes: ['/'],
		},
	},
	vite: {
		/** @see fix https://github.com/pi0/nuxt-shiki/issues/41 [vite:wasm-fallback] Could not load */
		plugins: import.meta.env.NODE_ENV === 'production' ? [unwasm({})] : undefined,
	},
	runtimeConfig: {
		turnstile: {
			secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
		},
		gqlHost: process.env.NUXT_GQL_HOST,
		gqlToken: process.env.NUXT_GQL_TOKEN,
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			siteUrlProd: process.env.NUXT_PUBLIC_SITE_URL_PROD,
			isProduction: process.env.NODE_ENV === 'production',
			isVercelProduction: process.env.VERCEL_ENV === 'production',
			calcomUrl: process.env.NUXT_PUBLIC_CALCOM_URL,
			openpanelClientId: process.env.NUXT_PUBLIC_OPENPANEL_CLIENT_ID,
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
	modules: [
		'@nuxt/image',
		'@nuxtjs/seo',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/turnstile',
		'nuxt-graphql-middleware',
		'nuxt-shiki',
	],

	// @nuxt/image
	image: {
		screens: breakpoints,
		domains: [process.env.NUXT_PUBLIC_WP_HOST || '', 'secure.gravatar.com'],
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

	// @nuxtseo/module robots
	robots: {
		disallow: ['/api/*'],
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
		defaultTheme: 'github-light',
		defaultLang: 'typescript',
		bundledThemes: [],
		bundledLangs: ['typescript', 'html', 'bash', 'php', 'graphql'],
	},
})
