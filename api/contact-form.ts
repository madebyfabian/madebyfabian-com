import { z } from 'zod'
import xss from 'xss'
import { graphql as gql } from '../graphql'
import type { AdminEmailQuery, SendEmailMutation, SendEmailMutationVariables } from '../types'

export const config = {
	runtime: 'edge',
}

const gqlHost = process.env.NUXT_GQL_HOST || ''
const gqlToken = process.env.NUXT_GQL_TOKEN || ''

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

const verifyTurnstileToken = async (token: string) => {
	const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
	const res = await fetch(endpoint, {
		method: 'POST',
		body: `secret=${encodeURIComponent(process.env.NUXT_TURNSTILE_SECRET_KEY || '')}&response=${encodeURIComponent(
			token
		)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
	const json = await res.json()
	return json
}

const getContactFormEmail = async () => {
	const query = /* GraphQL */ `
		query AdminEmail {
			allSettings {
				generalSettingsEmail
			}
		}
	`

	// Must be present for the generator to generate `AdminEmailQuery` type.
	const typedQuery = gql(query)

	const gqlRes = await fetch(gqlHost, {
		method: 'POST',
		headers: {
			'authorization': gqlToken,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables: {},
		}),
	})

	const res = ((await gqlRes.json())?.data as AdminEmailQuery) || null
	if (!res) {
		throw new Error('Failed to fetch admin email')
	}

	return res
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

	// Must be present for the generator to generate `SendEmailMutation` type.
	const typedMutation = gql(mutation)

	const variables: SendEmailMutationVariables = {
		input: {
			to: admin,
			from: admin,
			replyTo: `${input.name} <${input.email}>`,
			subject: 'New contact form request!',
			body: body,
		},
	}

	const gqlRes = await fetch(gqlHost, {
		method: 'POST',
		headers: {
			'authorization': gqlToken,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: mutation,
			variables,
		}),
	})

	const res = ((await gqlRes.json())?.data as SendEmailMutation) || null
	if (!res) {
		throw new Error('Failed to send email')
	}

	return res
}

const parseInput = ({ input }: { input: any }) => {
	const schema = z.object({
		name: z.string(),
		email: z.string(),
		message: z.string(),
		turnstileToken: z.string(),
	})
	return schema.parse(input)
}

type ValidRequestInput = ReturnType<typeof parseInput>

export default async function handler(request: Request) {
	try {
		const body = await new Response(request.body).json()
		if (!body) throw new Error('No body was provided. Please provide a body with the request.')

		const input = parseInput({ input: body })

		const validationResponse = await verifyTurnstileToken(input.turnstileToken)
		if (!validationResponse.success) {
			return new Response(JSON.stringify({ error: 'Failed to verify the captcha token.' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const contactFormEmailRes = await getContactFormEmail()
		const contactFormEmail = contactFormEmailRes.allSettings?.generalSettingsEmail
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
		console.error(error)
		return new Response(JSON.stringify({ error: (error as Error)?.message || 'Unknown error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
