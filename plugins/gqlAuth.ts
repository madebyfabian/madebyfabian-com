export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = useRuntimeConfig()

	nuxtApp.hook('apollo:auth', ({ token }) => {
		const envToken = runtimeConfig.public.GQL_TOKEN || process?.env?.GQL_TOKEN
		if (envToken) token.value = envToken
	})
})
