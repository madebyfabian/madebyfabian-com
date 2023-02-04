<template>
	<CookieControl :locale="locale">
		<template #bar>
			<p class="PLike">
				This website uses cookies to analyze site performance and to deliver an interactive experience. By
				clicking "<strong class="!font-bold">Accept all</strong>", you consent to our
				<NuxtLink :to="{ name: 'datenschutz' }" class="UILink">Cookie Policy</NuxtLink>. You may change your
				settings at any time.
			</p>
		</template>
	</CookieControl>
</template>

<script lang="ts" setup>
	import { locale } from '@/config'
</script>

<style lang="postcss">
	.cookieControl {
		* {
			font-family: inherit;
			line-height: inherit;
			font-size: inherit;
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
			@apply UIButton-secondary !shadow-border-and-shadow-lg right-4 bottom-4 md:right-8 md:bottom-8;
			/* override hover transition duration */
			@apply !transition;
		}

		.cookieControl__ControlButton,
		.cookieControl__Bar {
			@apply bg-white;

			svg {
				/* override hover transition duration */
				@apply !transition-none;
				@apply text-inherit;
			}
		}

		.cookieControl__Bar,
		.cookieControl__Modal {
			button:not(.cookieControl__ModalClose) {
				&:hover {
					@apply text-white;
				}
			}
		}

		.cookieControl__Bar {
			@apply border-t-2 md:border-0 md:shadow-border-2;
			@apply md:rounded-box shadow-border-2-and-shadow-xl;
			@apply md:right-6 md:bottom-6 w-full md:w-min;

			.cookieControl__BarContainer {
				@apply p-6 md:w-[24rem];

				h3 {
					@apply H3Like mb-2;
				}

				p {
					@apply m-0 w-full max-w-none;
				}
			}

			.cookieControl__BarButtons {
				@apply flex md:grid md:grid-cols-2 mt-6 gap-4 w-full;

				button {
					@apply m-0 flex-1;

					&:nth-child(2),
					&:nth-child(3) {
						@apply UIButton-secondary;
					}

					&:nth-child(3) {
						@apply md:col-span-2;
					}
				}
			}
		}

		.cookieControl__Modal {
			&:after {
				@apply bg-gray-800/75;
			}
		}

		.cookieControl__ModalCookieName {
			@apply normal-case;
		}

		.cookieControl__ModalContent {
			@apply md:rounded-2xl px-0 pb-0 overflow-hidden;
			@apply bg-white text-gray-body;

			.cookieControl__ModalClose {
				@apply UIButton-secondary;
			}

			h3 {
				@apply H3Like;
			}

			/* Main Container */
			& > div {
				@apply h-full flex flex-col overflow-y-scroll;

				& > div:nth-child(2),
				& > div:nth-child(3) {
					@apply px-6 md:px-10 flex-1;
				}

				/* This is the `required` section. */
				& > div:nth-child(2) {
					@apply mb-12;
				}

				.cookieControl__ModalInputWrapper {
					label {
						@apply mr-3 mt-0.5 bg-gray-300 shadow-inner cursor-pointer;

						/* Fixes issue where hidden label is displayed. */
						font-size: 0 !important;

						&:before {
							@apply bg-white;
						}
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
				@apply UIButtonGroup mt-12 sticky z-10 bottom-0 bg-frost pt-4 border-t p-6 md:p-10;

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
