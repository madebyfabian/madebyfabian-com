import { defineNuxtPlugin } from '#app'
import VueMatomo from 'vue-matomo'

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = useRuntimeConfig()
	const wpHost = runtimeConfig.public.wpHost

	// Don't track in dev.
	if (!runtimeConfig.public.isProduction) return

	nuxtApp.vueApp.use(VueMatomo, {
		host: `https://${wpHost}`,
		siteId: 1,
		trackerUrl: `https://${wpHost}/wp-content/plugins/matomo/app/matomo.php`,
		trackerScriptUrl: `https://${wpHost}/wp-content/uploads/matomo/matomo.js`,
		router: nuxtApp.$router,
		enableLinkTracking: true,
		requireConsent: false,
		trackInitialView: true,
		disableCookies: true,
		requireCookieConsent: false,
		enableHeartBeatTimer: true,
	})
})
