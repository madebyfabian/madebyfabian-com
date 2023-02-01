import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GraphQLClient, gql as gqlUntyped } from 'graphql-request'
import { z } from 'zod'

const graphQLClient = new GraphQLClient(process.env.NUXT_GQL_HOST || '', {
	headers: {
		authorization: process.env.NUXT_GQL_TOKEN || '',
	},
})

const getContactFormEmail = async () => {
	const query = gqlUntyped/* GraphQL */ `
		query AdminEmail {
			allSettings {
				generalSettingsEmail
			}
		}
	`
	return graphQLClient.request(query)
}

/**
 * Todo:
 * - [x] We want to verify the input into this request.
 * - [ ] (We want to verify the turnstile token.)
 * - [x] We want to fetch the admin email from wp graphql.
 * - [ ] We want to render the email body.
 * - [ ] We want to prepare and send the email via graphql.
 */

export default async function handler(request: VercelRequest, response: VercelResponse) {
	try {
		// First validate input
		const schema = z.object({
			name: z.string(),
			email: z.string(),
			message: z.string(),
			turnstileToken: z.string(),
		})

		const contactFormEmail = await getContactFormEmail()

		const input = schema.parse(request.body)

		return response.status(200).json({
			body: request.body,
			input,
			contactFormEmail,
		})
	} catch (error) {
		return response.status(500).json({
			error: (error as Error).message,
		})
	}
}
