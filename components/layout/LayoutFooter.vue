<template>
	<footer class="LayoutFooter border-t mt-16 py-8">
		<div class="container flex justify-between items-center h-full">
			<div class="font-bold">
				&copy; {{ new Date().getFullYear() }} &mdash;
				<UILink to="https://madebyfabian.com">madebyfabian.com</UILink>
			</div>

			<ul class="flex gap-x-6 gap-y-3 flex-wrap">
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
	</footer>
</template>

<script lang="ts" setup>
	const { data: menuData } = await useAsyncData(async () => {
		return await getMenu({
			menuId: 'dGVybTo4',
		})
	})
</script>
