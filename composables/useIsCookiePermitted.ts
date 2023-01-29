import type { CookieId } from '@/cookieConfig'

export const useIsCookiePermitted = (cookieId: CookieId) => {
	const { cookiesEnabledIds } = useCookieControl()
	return !!cookiesEnabledIds.value?.includes(cookieId)
}
