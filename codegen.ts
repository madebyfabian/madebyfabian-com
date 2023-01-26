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
		'./server/trpc/**/*.ts',
		'!./types/gen/**/*',

		// Exclude due to infinite loop
		'!./server/trpc/routers/singlePage.ts',
		'!./server/trpc/routers/singlePost.ts',
	],

	generates: {
		'./types/gen/graphql/': {
			preset: 'client',
			plugins: [],
		},
	},
}

export default config
