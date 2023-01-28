import { createSSRApp, reactive } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { z } from 'zod'
import sanitizeHtml from 'sanitize-html'
import { publicProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'

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
			const validationResponse = await verifyTurnstileToken(_input.turnstileToken)
			if (!validationResponse.success)
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
						message = sanitizeHtml(message)
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
