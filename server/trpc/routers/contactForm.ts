import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { publicProcedure, router } from '../trpc'
import { graphQLClient, gql } from '@/server/utils/graphQLClient'
import { createSSRApp, reactive } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { TRPCError } from '@trpc/server'

const verifyTurnstileToken = async ({ turnstileToken }: { turnstileToken: string }) => {
	try {
		const secretKey = process.env.NUXT_TURNSTILE_SECRET_KEY
		if (!secretKey || typeof secretKey !== 'string') throw new Error('No secret key found')
		const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
		let formData = new FormData()
		formData.append('secret', secretKey)
		formData.append('response', turnstileToken)
		formData.append('remoteip', '1.1.1.1')

		const res = await fetch(url, {
			body: formData,
			method: 'POST',
		})

		const outcome = await res.json()

		return !!outcome?.success
	} catch (error) {
		return false
	}
}

const getContactFormEmail = async () => {
	const query = gql(/* GraphQL */ `
		query AdminEmail {
			allSettings {
				generalSettingsEmail
			}
		}
	`)
	return graphQLClient.request(query)
}

export const contactFormRouter = router({
	send: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				message: z.string(),
				turnstileToken: z.string(),
			})
		)
		.mutation(async ({ ctx, input: _input }) => {
			const mutation = gql(/* GraphQL */ `
				mutation SendEmail($input: SendEmailInput!) {
					sendEmail(input: $input) {
						sent
						message
					}
				}
			`)

			// Verify the turnstile token
			const isValid = await verifyTurnstileToken({ turnstileToken: _input.turnstileToken })
			if (!isValid)
				throw new TRPCError({
					message: 'Failed to verify the turnstile token.',
					code: 'UNAUTHORIZED',
				})

			const contactFormEmailRes = await getContactFormEmail()
			const contactFormEmail = contactFormEmailRes.allSettings?.generalSettingsEmail
			if (!contactFormEmail)
				throw new TRPCError({
					message: 'Failed to get the receivers email adress from wp.',
					code: 'INTERNAL_SERVER_ERROR',
				})

			const ssrInput = createSSRApp({
				setup() {
					const getMessage = () => {
						let message = _input.message
						message = message.replace(/\n/g, '<br />')
						message = DOMPurify.sanitize(message)
						return message
					}

					const input = reactive({
						name: _input.name,
						email: _input.email,
						message: getMessage(),
					})

					return { input }
				},
				template: `<div class="email" :class="{ 'dynamic': true }">
						<ul>
							<li v-for="(value, key) in input" :key="key">
								<div>{{ key }}: </div>
								<div style="{ font-weight: bold; }" v-html="value" />
							</li>
						</ul>
					</div>`,
			})

			const body = ((await renderToString(ssrInput)) || undefined) as any
			if (!body)
				throw new TRPCError({
					message: 'Failed to render the email body.',
					code: 'INTERNAL_SERVER_ERROR',
				})

			const admin = `Admin <${contactFormEmail}>`

			return graphQLClient.request(mutation, {
				input: {
					to: admin,
					from: admin,
					replyTo: `${_input.name} <${_input.email}>`,
					subject: 'New contact form request!',
					body,
				},
			})
		}),
})
