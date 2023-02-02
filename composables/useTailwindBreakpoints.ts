import { breakpoints as tailwindBreakpoints } from '@/tailwind.config'

export const useTailwindBreakpoints = () => {
	const breakpoints = useBreakpoints(tailwindBreakpoints)
	return breakpoints
}
