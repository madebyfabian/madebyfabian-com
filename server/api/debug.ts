export default defineEventHandler(event => {
	const headers = getHeaders(event)

	return {
		headers,
	}
})
