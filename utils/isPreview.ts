/**
 * Determines if we are currently in the preview environment.
 */
export const isPreview = (): boolean => {
	try {
		const nuxtApp = useNuxtApp()
		const runtimeConfig = useRuntimeConfig()

		console.log(nuxtApp.ssrContext?.event.node.req.headers)

		let host: string | undefined = ''
		if (process.server) {
			host = nuxtApp.ssrContext?.event.node.req.headers?.host
		} else {
			host = window.location.host
		}

		const url = host ? `https://${host}` : undefined

		return url === runtimeConfig.public.siteUrlPreview
	} catch (error) {
		return false
	}
}
