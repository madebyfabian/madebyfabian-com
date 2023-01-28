import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { RequestDocument } from 'graphql-request'
import type { RequestHeaders } from 'h3'

/**
 * Depending on whether we are in a preview environment or not, we need to
 * get the correct post data. If we are in a preview environment, we need
 * to get both the real post and the draft post and decide which one to
 * return. Since most of the times there is no draft post.
 */
export const requestContent = async <I extends Record<string, any>>({
	headers,
	query,
	input,
	previewInput,
}: {
	headers: RequestHeaders
	query: RequestDocument | TypedDocumentNode<any, I>
	input: I
	previewInput?: I
}) => {
	const currentlyInPreview = isPreview({ headers: headers })

	// @ts-expect-error - @todo improve typings
	const promises = [graphQLClient.request(query, input)]
	if (currentlyInPreview) {
		// @ts-expect-error - @todo improve typings
		promises.push(graphQLClient.request(query, previewInput))
	}

	const [res, previewRes] = await Promise.allSettled(promises)
	const data = res?.status === 'fulfilled' ? res.value : null
	const previewData = previewRes !== undefined && previewRes?.status === 'fulfilled' ? previewRes.value : null

	return {
		data,
		previewData,
	}
}
