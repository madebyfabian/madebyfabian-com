<template>
	<article class="LayoutProjectsItem flex flex-col lg:flex-row gap-x-8 gap-y-4">
		<div>
			<!-- Logo -->
			<div class="LayoutProjectsItem-logo h-8 mb-5">
				<WPImage
					v-if="project.project?.logo?.sourceUrl"
					:src="project.project?.logo?.sourceUrl || undefined"
					:alt="project.project?.logo?.altText || ''"
					:ratio="{
						width: project.project?.logo?.mediaDetails?.width || 1,
						height: project.project?.logo?.mediaDetails?.height || 1,
					}"
					:path="'/wordpress-madebyfabian/'">
				</WPImage>
			</div>

			<!-- Title -->

			<WrapBalancer as="h2" class="H3Like reset" :ratio="0.15">
				{{ props.project.title }}
			</WrapBalancer>

			<WrapBalancer as="p" class="reset" :ratio="0.15">
				{{ props.project.excerpt }}
			</WrapBalancer>

			<pre>{{ props.project }}</pre>
		</div>

		<div class="shrink-0">
			<WPImage
				:src="project.featuredImage?.node?.sourceUrl || undefined"
				:alt="project.featuredImage?.node?.altText || ''"
				:path="'/wordpress-madebyfabian/'"
				class="w-full md:w-[296px] aspect-[4/3] rounded-box safari-overflow-fix shadow-inner select-none">
			</WPImage>
		</div>
	</article>
</template>

<script lang="ts" setup>
	import type { DeepPartial, Project } from '@/types'

	const props = defineProps<{
		project: DeepPartial<Project>
	}>()

	const aspectRatio = computed(() => {
		return `${props.project.project?.logo?.mediaDetails?.width}/${props.project.project?.logo?.mediaDetails?.height}`
	})
</script>

<style lang="postcss" scoped>
	.LayoutProjectsItem {
		@apply relative;
	}
	.LayoutProjectsItem-logo {
		aspect-ratio: v-bind(aspectRatio);
		@apply overflow-hidden relative grayscale opacity-50;
	}
</style>
