<template>
	<header class="LayoutHeader py-6 border-b mb-16 sticky top-0 bg-white">
		<div class="container flex justify-between items-center h-full flex-wrap gap-x-12 gap-y-3">
			<NuxtLink :to="{ name: 'index' }" class="text-2xl font-bold tracking-tight block">
				madebyfabian.com
			</NuxtLink>
			<div class="flex gap-6">
				<LayoutMenu menuId="dGVybTo3" class="flex gap-x-6 gap-y-2 flex-wrap" />
			</div>
		</div>
	</header>
</template>
