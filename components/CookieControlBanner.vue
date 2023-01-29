<template>
	<!--<CookieControl :locale="locale" />-->
</template>

<script lang="ts" setup>
	import { locale } from '@/cookieConfig'
</script>

<style lang="postcss">
	.cookieControl {
		* {
			font: inherit;
		}

		button {
			@apply UIButton;
		}

		.cookieControl__ControlButton {
			@apply UIButton-secondary;
		}

		.cookieControl__ControlButton,
		.cookieControl__Bar {
			@apply border-2 bg-white shadow-lg;

			svg {
				@apply text-inherit;
			}
		}

		.cookieControl__Bar {
			@apply rounded-xl shadow-xl;
			@apply md:right-6 md:bottom-6 w-full md:max-w-md;

			.cookieControl__BarContainer {
				@apply p-6;

				h3 {
					@apply H3Like mb-2;
				}

				p {
					@apply m-0 leading-relaxed w-full max-w-none;
				}

				div:first-of-type {
					* {
						@apply !text-inherit;
					}
				}
			}

			.cookieControl__BarButtons {
				@apply flex md:grid grid-cols-2 grid-rows-2 gap-4 mt-6;

				button {
					@apply m-0;

					&:nth-child(1),
					&:nth-child(2) {
						@apply md:row-span-1;
					}

					&:nth-child(1) {
						@apply col-start-1;
					}

					&:nth-child(2) {
						@apply col-start-2;
					}

					&:nth-child(3) {
						@apply UIButton-secondary col-span-2;
					}
				}
			}
		}

		.cookieControl__ModalContent {
			@apply rounded-2xl px-0 pb-0;

			.cookieControl__ModalClose {
				@apply UIButton-secondary;
			}
			h3 {
				@apply H3Like;
			}

			/* Main Container */
			& > div {
				@apply h-full flex flex-col;

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
				@apply mt-8 sticky bottom-0 bg-white pt-4 border-t;
				@apply p-6 md:p-10;

				button {
					&:nth-child(2),
					&:nth-child(3) {
						@apply !UIButton-secondary;
					}
				}
			}
		}
	}
</style>
