<template>
	<div class="container max-w-3xl">
		<h1 v-if="props.hasH1 && data.page?.title">{{ data.page?.title }}</h1>
		<RichtextContainer :blocksRaw="data?.page?.blocks" :slugKey="props.uri" />
		<slot />
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		hasH1?: boolean
		uri: string
	}>()

	const query = gql`
		query SinglePage($uri: ID!) {
			page(id: $uri, idType: URI) {
				id
				title
				isFrontPage
				blocks {
					attributesJSON
					name
					innerBlocks {
						attributesJSON
						name
						innerBlocks {
							attributesJSON
							name
							innerBlocks {
								attributesJSON
								name
								innerBlocks {
									attributesJSON
									name
								}
							}
						}
					}
				}
			}
		}
	`

	const { data, error } = await useAsyncQuery<any>(query, {
		uri: props.uri,
	})
	if (!data.value?.page || error.value) {
		throw createError({ statusCode: 404, message: 'Page not found' })
	}

	useSeoMeta({
		title: data.value.page?.title,
	})
</script>
