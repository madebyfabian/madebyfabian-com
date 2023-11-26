<template>
	<article
		class="LayoutProjectsItem bg-frost-200 shadow-border rounded-3xl flex flex-col lg:flex-row gap-x-10 gap-y-8 p-6 md:p-8">
		<div class="flex-1" :class="{ 'lg:order-2': isOdd }">
			<WPImage
				:src="project.featuredImage?.node?.sourceUrl || undefined"
				:alt="project.featuredImage?.node?.altText || ''"
				:path="'/wordpress-madebyfabian/'"
				class="w-full aspect-[4/3] rounded-xl safari-overflow-fix shadow-border select-none">
			</WPImage>
		</div>

		<div class="flex-1" :class="{ 'lg:order-1': isOdd }">
			<!-- Logo -->
			<div v-if="project.project?.logo?.sourceUrl" class="LayoutProjectsItem-logo h-8 mb-6 md:mb-8">
				<WPImage
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
			<h2 class="H3Like mb-4 reset [text-wrap:pretty]">
				{{ props.project.title }}
			</h2>

			<p class="reset [text-wrap:balance]">
				{{ props.project.excerpt }}
			</p>

			<UITagList class="mt-8" :tags="project?.tags?.edges" :linkUrl="project.project?.linkUrl" />
		</div>
	</article>
</template>

<script lang="ts" setup>
	import type { DeepPartial, Project } from '@/types'

	const props = defineProps<{
		project: DeepPartial<Project>
		index: number
	}>()

	const aspectRatio = computed(() => {
		return `${props.project.project?.logo?.mediaDetails?.width}/${props.project.project?.logo?.mediaDetails?.height}`
	})

	const isOdd = computed(() => {
		return props.index % 2 === 0
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
