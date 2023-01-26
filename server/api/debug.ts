export default defineEventHandler(event => {
	const runtimeConfig = useRuntimeConfig()

	return {
		runtimeConfig,
	}
})
