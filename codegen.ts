import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
	schema: {
		[process.env.GQL_HOST as string]: {
			headers: {
				'Authorization': process.env.GQL_TOKEN,
			},
		},
	} as any,
	documents: [
		'./**/*.vue',

		// Not using the `import { graphql } from '@/gql'` here because of the
		// repeating fields crash the geenrator.
		'!./components/layout/LayoutPage.vue',
		'!./pages/blog/[slug].vue',
	],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./gql/': {
			preset: 'client',
			config: {
				useTypeImports: true,
			},
			plugins: [],
		},
	},
}

export default config
