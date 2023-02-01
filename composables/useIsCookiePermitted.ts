import type { CookieId } from '@/config'

export const useIsCookiePermitted = (cookieId: CookieId) => {
	const { cookiesEnabledIds } = useCookieControl()
	return !!cookiesEnabledIds.value?.includes(cookieId)
}
