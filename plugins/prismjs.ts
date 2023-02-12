import * as Prism from 'prismjs'
import 'prismjs/themes/prism-twilight.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-graphql'

export default defineNuxtPlugin(nuxt => {
	return {
		provide: {
			Prism,
		},
	}
})
