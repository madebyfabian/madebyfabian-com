import { router } from '../trpc'

// Import all routers
import { generalRouter } from './general'
import { singlePageRouter } from './singlePage'
import { singlePostRouter } from './singlePost'

export const appRouter = router({
	general: generalRouter,
	singlePost: singlePostRouter,
	singlePage: singlePageRouter,
})

export type AppRouter = typeof appRouter
