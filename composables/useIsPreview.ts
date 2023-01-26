export const useIsPreview = () => {
	const runtimeConfig = useRuntimeConfig()
	return !!runtimeConfig.public.isPreview
}
