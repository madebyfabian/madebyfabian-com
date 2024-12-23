import { z } from 'zod'
import xss from 'xss'

export const config = {
	runtime: 'edge',
}

const renderBody = async (props: { name: string; email: string; message: string }) => {
	props.message = props.message.replace(/\n/g, '<br />')
	props.message = xss(props.message)

	const listItems = Object.entries(props).map(
		([key, value]) => `
			<li>
				<div>${key}:</div>
				<div style="{ font-weight: bold; }">${value}</div>
			</li>
		`
	)

	return `
		<ul>
			${listItems.join('<br /></br />')}
		</ul>
	`
}

const getContactFormEmail = async () => {
	const query = /* GraphQL */ `
		query AdminEmail {
			allSettings {
				generalSettingsEmail
			}
		}
	`

	return await graphQLQuery<any>({
		query,
		variables: {},
		fetch,
	})
}

const sendEmail = async ({
	contactFormEmail,
	input,
	body,
}: {
	contactFormEmail: string
	input: ValidRequestInput
	body: string
}) => {
	const admin = `Admin <${contactFormEmail}>`
	const mutation = /* GraphQL */ `
		mutation SendEmail($input: SendEmailInput!) {
			sendEmail(input: $input) {
				sent
				message
			}
		}
	`

	const variables = {
		input: {
			to: admin,
			from: admin,
			replyTo: `${input.name} <${input.email}>`,
			subject: 'New contact form request!',
			body: body,
		},
	}

	return await graphQLQuery<any>({
		query: mutation,
		variables: variables,
		fetch,
	})
}

const bodySchema = z.object({
	name: z.string(),
	email: z.string(),
	message: z.string(),
	turnstileToken: z.string(),
})

type ValidRequestInput = z.infer<typeof bodySchema>

export default defineEventHandler(async event => {
	try {
		const input = await readValidatedBody(event, bodySchema.parse)

		const validationResponse = await verifyTurnstileToken(input.turnstileToken, event)
		if (!validationResponse.success) {
			return new Response(JSON.stringify({ error: 'Failed to verify the captcha token.' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const contactFormEmailRes = await getContactFormEmail()
		const contactFormEmail = contactFormEmailRes?.allSettings?.generalSettingsEmail
		if (!contactFormEmail) throw new Error('Failed to get the receivers email adress from wp.')

		const renderedBody = await renderBody({
			name: input.name,
			email: input.email,
			message: input.message,
		})
		if (!renderedBody) throw new Error('Failed to render the email body.')

		const sendEmailRes = await sendEmail({
			contactFormEmail,
			input,
			body: renderedBody,
		})
		if (!sendEmailRes?.sendEmail?.sent) throw new Error('Failed to send the email.')

		return new Response(JSON.stringify({ data: 'Email sent.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('contact-form.ts', error)
		return new Response(JSON.stringify({ error: (error as Error)?.message || 'Unknown error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
})
