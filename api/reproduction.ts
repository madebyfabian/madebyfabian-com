import { createSSRApp, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'

export const config = {
	runtime: 'edge',
}

export default async function (req: Request) {
	try {
		const app = createSSRApp({
			setup() {
				const counter = ref(0)
				counter.value++

				return { counter }
			},

			template: `<div>{{ counter }}</div>`,
		})

		const html = await renderToString(app)

		return new Response(html, {
			headers: {
				'content-type': 'text/html; charset=utf-8',
			},
		})
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: {
				'content-type': 'text/plain; charset=utf-8',
			},
		})
	}
}
