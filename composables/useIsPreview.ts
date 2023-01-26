export const useIsPreview = () => {
	try {
		const nuxtApp = useNuxtApp()
		const runtimeConfig = useRuntimeConfig()

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
