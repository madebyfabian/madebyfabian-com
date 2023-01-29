<template>
	<!--<CookieIframe :locale="locale" />-->
</template>

<script lang="ts" setup>
	import { locale } from '@/cookieConfig'
</script>

<style lang="postcss">
	.cookieControl__BlockedIframe {
		@apply border rounded-xl p-6;

		* {
			font: inherit !important;
		}

		a {
			@apply UILink;
		}
	}
</style>
