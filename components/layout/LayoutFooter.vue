<template>
	<footer class="LayoutFooter border-t mt-16 py-8">
		<div class="container flex justify-between items-center h-full">
			<div class="font-semibold">
				&copy; {{ new Date().getFullYear() }} &mdash;
				<NuxtLink class="UILink" to="https://madebyfabian.com" external>
					<span>madebyfabian.com</span>
				</NuxtLink>
			</div>

			<LayoutMenu menuId="dGVybTo4" class="flex gap-x-6 gap-y-3 flex-wrap" />
		</div>
	</footer>
</template>
