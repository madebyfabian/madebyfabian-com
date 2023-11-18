import { joinURL } from 'ufo'
import { fetch } from 'ofetch'

type SitemapItem = {
	loc: string
	changefreq?: 'weekly' | 'monthly'
	priority?: 0 | 0.8 | 1 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.9
	lastmod?: string
}

const sitemapDefaults: Pick<SitemapItem, 'changefreq' | 'priority'> = {
	changefreq: 'monthly',
	priority: 0.8,
}

export const generateSitemap = async () => {
	try {
		const graphqlBase = process.env.NUXT_GQL_HOST
		const graphqlToken = process.env.NUXT_GQL_TOKEN
		const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
		if (!graphqlBase || !graphqlToken || !siteUrl)
			throw new Error('GNUXT_QL_HOST or NUXT_GQL_TOKEN or NUXT_PUBLIC_SITE_URL is not defined')

		const req = await fetch(graphqlBase, {
			method: 'POST',
			headers: {
				'Authorization': graphqlToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: /* GraphQL */ `
					query PagesAndPosts {
						pages(where: { status: PUBLISH }) {
							edges {
								node {
									id
									title
									uri
									modifiedGmt
									isFrontPage
								}
							}
						}
						posts(where: { status: PUBLISH }) {
							edges {
								node {
									id
									title
									modifiedGmt
									uri
								}
							}
						}
					}
				`,
			}),
		})
		const json = await req.json()

		const pages: SitemapItem[] = []

		json.data.pages.edges?.forEach((edge: any) => {
			pages.push({
				priority: edge.node.isFrontPage ? 1 : 0.8,
				changefreq: edge.node.isFrontPage ? 'weekly' : 'monthly',
				loc: joinURL(siteUrl, edge.node.uri),
				lastmod: new Date(edge.node.modifiedGmt).toISOString(),
			})
		})

		json.data.posts.edges?.forEach((edge: any) => {
			pages.push({
				...sitemapDefaults,
				loc: joinURL(siteUrl, edge.node.uri),
				lastmod: new Date(edge.node.modifiedGmt).toISOString(),
			})
		})

		return pages
	} catch (error) {
		console.error(error)
		return []
	}
}
