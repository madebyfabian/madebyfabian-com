import superjson from 'superjson'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
	const headers = useRequestHeaders()

	/**
	 * createTRPCNuxtClient adds a `useQuery` composable
	 * built on top of `useAsyncData`.
	 */
	const client = createTRPCNuxtClient<AppRouter>({
		transformer: superjson,
		links: [
			httpBatchLink({
				url: '/api/trpc',
				headers() {
					return headers
				},
			}),
		],
	})

	return {
		provide: {
			client,
		},
	}
})
