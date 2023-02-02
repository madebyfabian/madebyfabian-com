<template>
	<WrapBalancerProvider>
		<BgBlur position="topLeft" />
		<BgBlur position="bottomRight" />
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
