import { isPreview } from '@/utils/isPreview'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { RequestDocument } from 'graphql-request'

/**
 * Depending on whether we are in a preview environment or not, we need to
 * get the correct post data. If we are in a preview environment, we need
 * to get both the real post and the draft post and decide which one to
 * return. Since most of the times there is no draft post.
 */
export const requestContent = async <I extends Record<string, any>>({
	query,
	input,
	previewInput,
}: {
	query: RequestDocument | TypedDocumentNode<any, I>
	input: I
	previewInput?: I
}) => {
	const currentlyInPreview = isPreview()

	// @ts-expect-error - @todo improve typings
	const promises = [graphQLClient.request(query, input)]
	if (currentlyInPreview) {
		// @ts-expect-error - @todo improve typings
		promises.push(graphQLClient.request(query, previewInput))
	}

	const [res, previewRes] = await Promise.allSettled(promises)

	const data = res !== undefined && 'value' in res && res.value
	const previewData = previewRes !== undefined && 'value' in previewRes && previewRes.value

	return previewData || data
}
