<template>
	<footer class="border-t mt-16 py-8">
		<div class="container flex justify-between items-center h-full">
			<div class="font-bold">
				&copy; {{ new Date().getFullYear() }} &mdash;
				<UILink to="https://madebyfabian.com">madebyfabian.com</UILink>
			</div>
			<div class="flex gap-x-6 gap-y-3 flex-wrap">
				<UILink to="/impressum">Impressum</UILink>
			</div>
		</div>
	</footer>
</template>
