import { EnumChangefreq, type SitemapItemLoose } from 'sitemap'
import { joinURL } from 'ufo'
import { fetch } from 'ofetch'

const sitemapDefaults: Pick<SitemapItemLoose, 'changefreq' | 'priority'> = {
	changefreq: EnumChangefreq.MONTHLY,
	priority: 0.8,
}

export const generateSitemap = async () => {
	try {
		const graphqlBase = process.env.GQL_HOST
		const graphqlToken = process.env.GQL_TOKEN
		const siteUrl = process.env.NUXT_PUBLIC_SITE_URL
		if (!graphqlBase || !graphqlToken || !siteUrl)
			throw new Error('GQL_HOST or GQL_TOKEN or NUXT_PUBLIC_SITE_URL is not defined')

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

		const pages: SitemapItemLoose[] = []

		json.data.pages.edges?.forEach((edge: any) => {
			pages.push({
				priority: edge.node.isFrontPage ? 1 : 0.8,
				changefreq: edge.node.isFrontPage ? EnumChangefreq.WEEKLY : EnumChangefreq.MONTHLY,
				url: joinURL(siteUrl, edge.node.uri),
				lastmodISO: new Date(edge.node.modifiedGmt).toISOString(),
			})
		})

		json.data.posts.edges?.forEach((edge: any) => {
			pages.push({
				...sitemapDefaults,
				url: joinURL(siteUrl, edge.node.uri),
				lastmodISO: new Date(edge.node.modifiedGmt).toISOString(),
			})
		})

		return pages
	} catch (error) {
		console.error(error)
		return []
	}
}
