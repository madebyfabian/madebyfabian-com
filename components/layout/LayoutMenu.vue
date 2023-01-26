<template>
	<ul class="LayoutMenu">
		<li v-for="menuItem of menuData">
			<UILink
				:to="menuItem?.node?.uri"
				:external="menuItem?.node?.target === '_blank'"
				:target="menuItem?.node?.target">
				{{ menuItem?.node?.label }}
			</UILink>
		</li>
	</ul>
</template>

<script setup lang="ts">
	const { $client } = useNuxtApp()

	const props = defineProps<{
		menuId: string
	}>()

	const { data, error } = await $client.general.singleMenu.useQuery({
		menuId: props.menuId,
	})
	if (!data.value || error.value) {
		throw new Error('Error fetching menu')
	}

	const removeTrailingSlash = (str: string) => {
		return str !== '/' ? str.replace(/\/$/, '') : str
	}

	const menuData = computed(() => {
		const menuData = data.value?.menu?.menuItems?.edges?.map((edge: any) => ({
			node: {
				...edge.node,
				uri: removeTrailingSlash(edge.node.uri),
			},
		}))

		return menuData?.sort((edge: any) => edge.node.order)
	})
</script>
