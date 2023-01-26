export default defineEventHandler(event => {
	const runtimeConfig = useRuntimeConfig()
	const headers = getHeaders(event)

	let host = headers?.host
	const url = host ? `https://${host}` : undefined

	return {
		processServer: process.server,
		url,
		host,
		runtimeConfig,
		headers,
		env: process.env,
	}

	//return url === runtimeConfig.public.siteUrlPreview
})
