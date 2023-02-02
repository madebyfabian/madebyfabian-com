<template>
	<ul class="LayoutMenu">
		<li v-for="(menuItem, key) of menuData" class="flex items-center">
			<NuxtLink
				class="UILink whitespace-nowrap p-2 -m-2"
				:to="menuItem?.node?.uri"
				:external="menuItem?.node?.target === '_blank'"
				:target="menuItem?.node?.target">
				{{ menuItem?.node?.label }}
			</NuxtLink>
			<span
				v-if="key + 1 !== menuData?.length"
				class="mx-2 lg:mx-3 font-bold scale-125 opacity-30 -mt-1 inline-block"
				>·</span
			>
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

	const menuData = computed(() => {
		const menuData = data.value?.menu?.menuItems?.edges?.map((edge: any) => ({
			node: {
				...edge.node,
				uri: edge.node.uri,
			},
		}))

		return menuData?.sort((edge: any) => edge.node.order)
	})
</script>
