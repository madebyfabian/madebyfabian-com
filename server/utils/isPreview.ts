import type { RequestHeaders } from 'h3'
import { withHttps } from 'ufo'

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

		const host = headers?.host
		const url = host ? withHttps(host) : undefined

		return url === runtimeConfig.public.siteUrlPreview
	} catch (error) {
		return false
	}
}
