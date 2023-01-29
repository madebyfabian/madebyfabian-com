<template>
	<CookieControl :locale="locale" />
</template>

<script lang="ts" setup>
	import { locale } from '@/cookieConfig'
</script>

<style lang="postcss">
	.cookieControl {
		* {
			font: inherit;
		}

		p,
		span,
		button {
			/* Needs to be specified due to overriding issues. */
			font-size: inherit !important;
			line-height: inherit !important;
		}

		button {
			@apply UIButton;
		}

		.cookieControl__ControlButton {
			@apply UIButton-secondary right-4 bottom-4 md:right-8 md:bottom-8;
		}

		.cookieControl__ControlButton,
		.cookieControl__Bar {
			@apply bg-white shadow-lg;

			svg {
				@apply text-inherit;
			}
		}

		.cookieControl__Bar {
			@apply border-t-2 md:border-0 md:outline-border-2;
			@apply md:rounded-xl shadow-xl;
			@apply md:right-6 md:bottom-6 w-full md:w-min;

			.cookieControl__BarContainer {
				@apply p-6;

				h3 {
					@apply H3Like mb-2;
				}

				p {
					@apply m-0 w-full max-w-none;
				}

				div:first-of-type {
					* {
						@apply !text-inherit;
					}
				}
			}

			.cookieControl__BarButtons {
				@apply flex mt-6 gap-3;

				button {
					@apply m-0 flex-1;

					&:nth-child(2) {
						@apply UIButton-secondary;
					}
				}
			}
		}

		.cookieControl__ModalContent {
			@apply md:rounded-2xl px-0 pb-0 overflow-hidden;

			.cookieControl__ModalClose {
				@apply UIButton-secondary;
			}

			h3 {
				@apply H3Like;
			}

			/* Main Container */
			& > div {
				@apply h-full flex flex-col overflow-y-scroll;

				/* This is the `required` section. Since we don't have cookies required, it would be emopty. */
				& > div:nth-child(2) {
					@apply hidden;
				}

				/* This is the `optional` section. */
				& > div:nth-child(3) {
					@apply px-6 md:px-10 flex-1;
				}

				.cookieControl__ModalInputWrapper {
					label {
						@apply mr-3 mt-0.5 bg-gray-300 shadow-inner cursor-pointer;

						/* Fixes issue where hidden label is displayed. */
						font-size: 0 !important;
					}

					input:checked + label {
						@apply bg-accent-700;
					}

					.cookieControl__ModalCookieName {
						@apply font-bold;

						span {
							@apply text-gray-500 font-normal;
						}
					}
				}
			}

			.cookieControl__ModalButtons {
				@apply mt-12 sticky z-10 bottom-0 bg-frost pt-4 border-t p-6 md:p-10 flex gap-3;

				button {
					@apply m-0 flex-1;

					&:nth-child(2),
					&:nth-child(3) {
						@apply !UIButton-secondary;
					}
				}
			}
		}
	}
</style>
