import type { RenderResponse } from 'nitropack'
import auth from 'basic-auth'

export default defineNitroPlugin(nitroApp => {
	nitroApp.hooks.hook('render:response', async (response: RenderResponse, { event }) => {
		const config = {
			username: process.env.STAGING_USERNAME,
			password: process.env.STAGING_PASSWORD,
			enabled: process.env.STAGING_PASSWORD,
		}

		const header = event.node.req.rawHeaders.find((header: string) => header.startsWith('Basic '))
		const credentials = auth.parse(header)

		if (
			config.username &&
			config.password &&
			config.enabled &&
			(!credentials || credentials.name !== config.username || credentials.pass !== config.password)
		) {
			response.statusCode = 401
			response.headers = response.headers || {}
			response.headers['WWW-Authenticate'] = 'Basic realm="example"'
			response.body = 'Access denied!'
		}
	})
})
