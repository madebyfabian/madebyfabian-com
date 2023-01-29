import type { Cookie, ModuleOptions, Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'

export const cookieIds = ['cloudflareTurnstile'] as const
export const locale: Locale = 'en'

export type CookieId = (typeof cookieIds)[number]

type CookieEntry = Cookie & {
	id: CookieId
}

export const cookieConfig: Partial<ModuleOptions> & {
	cookies: {
		necessary: CookieEntry[]
		optional: CookieEntry[]
	}
} = {
	barPosition: 'bottom-right',
	locales: [locale],
	cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 30, // 30 days,
	cookies: {
		necessary: [],
		optional: [
			{
				id: 'cloudflareTurnstile',
				description: {
					en: 'Used to verify you are a human before sending a contact form.',
				},
				name: {
					en: 'Cloudflare Turnstile',
				},
				targetCookieIds: ['__cf_bm'],
			},
		],
	},
}
