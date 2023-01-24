import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: process.env.WP_GRAPHQL_BASE_URL,
	documents: ['./**/*.vue'],
	ignoreNoDocuments: true,
	generates: {
		'./types/gen/': {
			preset: 'client',
			config: {
				useTypeImports: true,
			},
			plugins: [],
		},
	},
}

export default config
