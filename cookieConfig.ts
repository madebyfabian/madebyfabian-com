import type { Cookie, ModuleOptions, Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'

export const cookieIds = ['cookieControl', 'cloudflare', 'calendly'] as const
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
	isCssPolyfillEnabled: false,
	cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 30, // 30 days,
	cookies: {
		necessary: [
			{
				id: 'cookieControl',
				description: {
					en: 'Used to store your cookie preferences.',
				},
				name: {
					en: 'Cookie Control',
				},
				targetCookieIds: ['cookie_control_cookies_enabled_ids', 'cookie_control_is_consent_given'],
			},
			{
				id: 'cloudflare',
				description: {
					en: 'Used to verify you are a human.',
				},
				name: {
					en: 'Cloudflare',
				},
				targetCookieIds: [
					'__cf_bm',
					'__cflb',
					'__cf_bm',
					'cf_ob_info',
					'cf_use_ob',
					'__cfwaitingroom',
					'__cfruid',
				],
			},
		],
		optional: [
			{
				id: 'calendly',
				description: {
					en: 'Used to schedule a meeting with me.',
				},
				name: {
					en: 'Calendly',
				},
				targetCookieIds: [
					'__cf_bm',
					'__cfruid',
					'_dd_s',
					'OptanonConsent',
					'OptanonAlertBoxClosed',
					'_calendly_session',
					'gdpr_trackable',
					'login_email',
				],
			},
		],
	},
}
