<template>
	<div class="container">
		<h1 class="text-4xl">Welcome to your page!</h1>
		<pre>{{ data }}</pre>
	</div>
</template>

<script lang="ts" setup>
	const query = gql`
		query {
			posts {
				nodes {
					id
					title
				}
			}
		}
	`
	const { data } = await useAsyncQuery(query)
</script>
