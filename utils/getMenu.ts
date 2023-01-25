const removeTrailingSlash = (str: string) => {
	return str !== '/' ? str.replace(/\/$/, '') : str
}

export const getMenu = async ({ menuId }: { menuId: string }) => {
	try {
		const { data, error } = await useAsyncGql({
			operation: 'SingleMenu',
			variables: {
				id: menuId,
			},
		})
		if (!data.value || error.value) {
			throw new Error('Error fetching menu')
		}

		const menuData = data.value?.menu?.menuItems?.edges?.map((edge: any) => ({
			node: {
				...edge.node,
				uri: removeTrailingSlash(edge.node.uri),
			},
		}))

		const sortedMenuData = menuData?.sort((edge: any) => edge.node.order)
		return sortedMenuData
	} catch (error) {
		return []
	}
}
