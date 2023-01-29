<template>
	<WrapBalancerProvider>
		<BgBlur />
		<SeoKit />
		<div class="flex-1 flex flex-col relative">
			<LayoutHeader />
			<div class="flex-1">
				<slot />
			</div>
			<LayoutFooter />
		</div>
	</WrapBalancerProvider>
</template>

<script setup lang="ts">
	import { Provider as WrapBalancerProvider } from 'vue-wrap-balancer'
</script>
