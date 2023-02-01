<template>
	<CookieIframe :locale="locale" />
</template>

<script lang="ts" setup>
	import { locale } from '@/config'
</script>

<style lang="postcss">
	.cookieControl__BlockedIframe {
		@apply shadow-border border-0 rounded-box p-6;

		* {
			font: inherit !important;
		}

		a {
			/* Needs to be specified due to overriding issues. */
			font-size: inherit !important;
			line-height: inherit !important;
			font-weight: bold !important;
		}

		a {
			@apply UILink;
		}
	}
</style>
