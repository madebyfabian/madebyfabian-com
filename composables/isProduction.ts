export const isProduction = () => {
	const runtimeConfig = useRuntimeConfig()
	const isProductionValue = useState('isProduction', () => !!runtimeConfig.public.isProduction)
	return isProductionValue
}
