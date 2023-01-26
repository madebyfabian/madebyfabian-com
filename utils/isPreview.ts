import type { RequestHeaders } from 'h3'

/**
 * Determines if we are currently in the preview environment.
 */
export const isPreview = ({
	headers,
}: {
	/** The nuxtApp is not available sometimes. Maybe use `nuxtApp.ssrContext?.event.node.req.headers` in the future. */
	headers: RequestHeaders
}): boolean => {
	try {
		const runtimeConfig = useRuntimeConfig()

		let host: string | undefined = ''
		if (process.server) {
			host = headers?.host
		} else {
			host = window.location.host
		}

		const url = host ? `https://${host}` : undefined

		return url === runtimeConfig.public.siteUrlPreview
	} catch (error) {
		return false
	}
}
