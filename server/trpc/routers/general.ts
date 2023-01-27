import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { graphQLClient, gql } from '@/server/utils/graphQLClient'

export const generalRouter = router({
	allSettings: publicProcedure.query(async () => {
		const query = gql(/* GraphQL */ `
			query AllSettings {
				allSettings {
					generalSettingsTitle
					generalSettingsDescription
				}
				viewer {
					firstName
					lastName
					url
					avatar(size: 360) {
						url
						foundAvatar
					}
				}
			}
		`)

		return graphQLClient.request(query)
	}),

	singleMenu: publicProcedure.input(z.object({ menuId: z.string() })).query(async ({ input }) => {
		const query = gql(/* GraphQL */ `
			query SingleMenu($id: ID!) {
				menu(id: $id, idType: ID) {
					id
					name
					menuItems {
						edges {
							node {
								id
								label
								order
								uri
								target
							}
						}
					}
				}
			}
		`)

		return graphQLClient.request(query, { id: input.menuId })
	}),

	listPosts: publicProcedure.query(async () => {
		const query = gql(/* GraphQL */ `
			query ListPosts {
				posts {
					nodes {
						id
						title
						dateGmt
						slug
						excerpt(format: RAW)
						author {
							node {
								name
								databaseId
								avatar(size: 360) {
									url
									foundAvatar
								}
							}
						}
						featuredImage {
							node {
								id
								sourceUrl
								altText
							}
						}
						tags {
							edges {
								node {
									id
									name
								}
							}
						}
					}
				}
			}
		`)

		return graphQLClient.request(query)
	}),

	mediaItems: publicProcedure
		.input(
			z.object({
				imageIds: z.array(z.string()),
			})
		)
		.query(async ({ input }) => {
			const query = gql(/* GraphQL */ `
				query MediaItems($inIds: [ID]!) {
					mediaItems(where: { in: $inIds }) {
						edges {
							node {
								id
								databaseId
								sourceUrl
								description
								caption
								mediaDetails {
									height
									width
								}
							}
						}
					}
				}
			`)

			return graphQLClient.request(query, {
				inIds: input.imageIds,
			})
		}),

	authorDetails: publicProcedure
		.input(
			z.object({
				authorId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const query = gql(/* GraphQL */ `
				query AuthorDetails($id: ID!) {
					user(id: $id, idType: DATABASE_ID) {
						id
						name
						databaseId
						avatar(size: 360) {
							url
							foundAvatar
						}
						roles {
							edges {
								node {
									id
									displayName
								}
							}
						}

						# Same as listPosts query
						posts {
							edges {
								node {
									id
									title
									dateGmt
									slug
									excerpt(format: RAW)
									author {
										node {
											name
											databaseId
											avatar(size: 360) {
												url
												foundAvatar
											}
										}
									}
									featuredImage {
										node {
											id
											sourceUrl
											altText
										}
									}
									tags {
										edges {
											node {
												id
												name
											}
										}
									}
								}
							}
						}
					}
				}
			`)

			return graphQLClient.request(query, {
				id: input.authorId,
			})
		}),
})
