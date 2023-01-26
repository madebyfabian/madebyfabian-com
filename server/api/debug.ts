export default defineEventHandler(event => {
	const runtimeConfig = useRuntimeConfig()
	const headers = getHeaders(event)

	let host: string | undefined = ''
	if (process.server) {
		host = headers?.host
	} else {
		host = window.location.host
	}

	const url = host ? `https://${host}` : undefined

	return {
		url,
		host,
		runtimeConfig,
	}

	//return url === runtimeConfig.public.siteUrlPreview
})
