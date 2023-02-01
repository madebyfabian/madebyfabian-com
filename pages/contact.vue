<template>
	<LayoutPage hasH1 :uri="uri">
		<ClientOnly>
			<Calendly />

			<form @submit.prevent="send">
				<h2 class="H3Like">Or send me some words</h2>
				<div class="flex gap-6 flex-col mt-8">
					<div class="flex flex-col md:flex-row gap-6">
						<input type="text" placeholder="Name" v-model="state.form.name" required class="UIInput" />
						<input type="email" placeholder="Email" v-model="state.form.email" required class="UIInput" />
					</div>
					<textarea placeholder="Message" v-model="state.form.message" required rows="5" class="UIInput" />
				</div>

				<div class="flex justify-between flex-wrap gap-8 my-8">
					<p class="PLike">
						By submitting this form,<br />you agree to the
						<NuxtLink :to="{ name: 'datenschutz' }" target="_blank" class="UILink">Privacy Policy</NuxtLink
						>.
					</p>

					<button :disabled="!turnstileIsDone" class="w-full md:w-[33%] UIButton">Send!</button>
				</div>

				<Turnstile
					v-if="turnstileIsPermitted"
					ref="turnstileRef"
					v-model="turnstileToken"
					:options="{
						theme: 'light',
					}" />

				<CookieControlDenied v-else />
			</form>

			<div v-if="state.status === 'success'" class="mt-8 text-green-700 font-bold">
				Your message has been sent!
			</div>
			<div v-if="state.status === 'error'" class="mt-8 text-red-700 font-bold">An error occurred!</div>
			<div v-if="state.status === 'pending'" class="mt-8 text-gray-body font-bold">Please wait...</div>
		</ClientOnly>
	</LayoutPage>
</template>

<script lang="ts" setup>
	const { $client } = useNuxtApp()
	const route = useRoute('contact')
	const uri = computed(() => route.fullPath)

	const turnstileIsPermitted = computed(() => useIsCookiePermitted('cloudflare'))
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

			const res = await $fetch('/api/contact-form', {
				method: 'POST',
				body: {
					name: state.form.name,
					email: state.form.email,
					message: state.form.message,
					turnstileToken: turnstileToken.value,
				},
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
