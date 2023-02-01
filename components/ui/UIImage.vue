<template>
	<div
		class="UIImage"
		:style="{
			'height': !props.ratio ? '100%' : undefined,
		}"
		v-bind="parentProps">
		<TwicImg
			v-if="srcPath"
			:src="srcPath"
			:ratio="ratio"
			:class="props.class"
			:alt="props.alt"
			:eager="props.eager"
			:intrinsic="props.intrinsic ? `${props.intrinsic.width}x${props.intrinsic.height}` : undefined"
			v-bind="$attrs" />

		<slot v-else name="fallback" />
	</div>
</template>

<script setup lang="ts">
	import { joinURL, withLeadingSlash, withoutLeadingSlash, withoutTrailingSlash } from 'ufo'
	import type { TwicpicsConfig } from '@/config'
	const runtimeConfig = useRuntimeConfig()

	interface Props {
		src?: string
		ratio?: {
			width: number
			height: number
		}
		intrinsic?: {
			width: number
			height: number
		}
		class?: any
		alt: string
		eager?: boolean

		/** the path behind https://example.twic.pics/THIS/ */
		path: 'wordpress-madebyfabian' | 'gravatar'
	}

	const props = defineProps<Props>()

	const parentProps = computed(() => {
		const { src, ratio, alt, ...rest } = props
		delete rest.class
		return rest
	})

	const ratio = computed(() => {
		if (!props.ratio) return 'none'
		return `${props.ratio.width}/${props.ratio.height}`
	})

	const twicpicsPaths = runtimeConfig.public.twicpicsConfig?.paths as TwicpicsConfig['paths']
	// We only need the path after the base URL.
	const pathConfig = twicpicsPaths?.find(
		pathConfig =>
			withoutLeadingSlash(withoutTrailingSlash(pathConfig.path)) ===
			withoutLeadingSlash(withoutTrailingSlash(props.path))
	)

	const srcPath = computed(() => {
		if (!props.src || typeof props.src !== 'string' || !props.src.length) return undefined
		if (!pathConfig) return undefined

		// WP Gives us the full URL, we only need the path.
		const withoutHost = props.src.replace(pathConfig.source, '')
		return withLeadingSlash(joinURL(props.path, withoutHost))
	})
</script>
