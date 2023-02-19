import { router } from '../trpc'

// Import all routers
import { singlePageRouter } from './singlePage'
import { singlePostRouter } from './singlePost'

export const appRouter = router({
	singlePost: singlePostRouter,
	singlePage: singlePageRouter,
})

export type AppRouter = typeof appRouter
