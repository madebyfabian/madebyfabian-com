<template>
	<header class="LayoutHeader py-8 border-b mb-16 sticky top-0 bg-white">
		<div class="container flex justify-between items-center h-full flex-wrap gap-y-3">
			<NuxtLink to="/" class="text-2xl font-bold tracking-tight block">madebyfabian.com</NuxtLink>

			<ul class="flex gap-6">
				<template v-if="menuData?.length">
					<li v-for="menuItem of menuData">
						<UILink
							:to="menuItem?.node?.uri"
							:external="menuItem?.node?.target === '_blank'"
							:target="menuItem?.node?.target">
							{{ menuItem?.node?.label }}
						</UILink>
					</li>
				</template>
			</ul>
		</div>
	</header>
</template>

<script lang="ts" setup>
	const { data: menuData } = await useAsyncData(async () => {
		return await getMenu({
			menuId: 'dGVybTo3',
		})
	})
</script>
