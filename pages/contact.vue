<template>
	<LayoutPage hasH1 :uri="uri">
		<ClientOnly>
			<form @submit.prevent="send">
				<div class="flex gap-6 flex-col mt-12">
					<div class="flex flex-col md:flex-row gap-6">
						<input
							type="text"
							placeholder="Name"
							v-model="state.form.name"
							required
							class="block w-full h-12 px-4 bg-frost-2 outline-border rounded-xl" />
						<input
							type="email"
							placeholder="Email"
							v-model="state.form.email"
							required
							class="block w-full h-12 px-4 bg-frost-2 outline-border rounded-xl" />
					</div>
					<textarea
						placeholder="Message"
						v-model="state.form.message"
						required
						rows="5"
						class="block w-full py-3 px-4 bg-frost-2 outline-border rounded-xl overflow-hidden" />
				</div>

				<div class="flex justify-between flex-wrap gap-8 mt-8">
					<div>
						<Turnstile
							v-if="turnstileIsPermitted"
							ref="turnstileRef"
							v-model="turnstileToken"
							:options="{
								theme: 'light',
							}" />

						<CookieControlDenied v-else />
					</div>

					<button :disabled="!turnstileIsDone" class="w-full md:w-[33%] UIButton">Send!</button>
				</div>
			</form>

			<div v-if="state.status === 'success'" class="mt-8 text-green-700 font-bold">
				Your message has been sent!
			</div>
			<div v-if="state.status === 'error'" class="mt-8 text-red-700 font-bold">An error occurred!</div>
			<div v-if="state.status === 'pending'" class="mt-8 text-gray-700 font-bold">Please wait...</div>
		</ClientOnly>
	</LayoutPage>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()
	const route = useRoute('contact')
	const uri = computed(() => route.fullPath)

	const turnstileIsPermitted = computed(() => useIsCookiePermitted('cloudflareTurnstile'))
	const turnstileRef = ref()
	const turnstileToken = ref()
	const turnstileIsDone = computed(() => {
		if (!turnstileIsPermitted.value) return false
		return !!turnstileToken.value?.length
	})

	const state = reactive({
		form: {
			name: '',
			email: '',
			message: '',
		},
		status: 'idle' as 'idle' | 'pending' | 'success' | 'error' | null,
	})

	const send = async () => {
		try {
			state.status = 'pending'

			if (!turnstileToken.value) throw new Error('No turnstile token')

			const res = await $client.contactForm.send.mutate({
				name: state.form.name,
				email: state.form.email,
				message: state.form.message,
				turnstileToken: turnstileToken.value,
			})

			if (res.sendEmail?.sent) {
				state.status = 'success'
			}

			turnstileRef.value?.reset()
		} catch (error) {
			state.status = 'error'
		}
	}

	useSeoMeta({
		title: 'Contact',
	})
</script>
