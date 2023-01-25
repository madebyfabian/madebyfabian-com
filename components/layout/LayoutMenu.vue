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
	import { graphql } from '@/gql'

	const removeTrailingSlash = (str: string) => {
		return str !== '/' ? str.replace(/\/$/, '') : str
	}

	const query = graphql(`
		query SingleMenu($id: ID!) {
			menu(id: $id, idType: ID) {
				id
				name
				menuItems {
					edges {
						node {
							id
							label
							order
							uri
							target
						}
					}
				}
			}
		}
	`)

	const props = defineProps<{
		menuId: string
	}>()

	const { data, error } = await useAsyncQuery(query, {
		id: props.menuId,
	})
	if (!data.value || error.value) {
		throw new Error('Error fetching menu')
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
