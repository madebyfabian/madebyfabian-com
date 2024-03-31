import { Openpanel } from '@openpanel/web'

/** Analytics */
export default defineNuxtPlugin({
	name: 'openpanel',
	async setup(nuxtApp) {
		const op = new Openpanel({
			clientId: nuxtApp.$config.public.openpanelClientId,
			trackScreenViews: !import.meta.dev,
			trackOutgoingLinks: !import.meta.dev,
		})
		nuxtApp.vueApp.provide('openpanel', op)
	},
})
