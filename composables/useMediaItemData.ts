import type { GenerateBlocksDataReturnType } from '@/server/utils/generateBlocksData'

export const generateMediaItemsKey = ({ route }: { route: any }) => {
	return `mediaItems:${route.path}`
}

/**
 * Used to get an array of media items out of the store.
 */
export const useMediaItemData = ({ id }: { id: number | undefined | null }) => {
	const route = useRoute()
	const key = generateMediaItemsKey({ route })
	const mediaItems = useState<GenerateBlocksDataReturnType['mediaItems']>(key)
	const mediaData = useState(`${key}:${id}`, () => {
		if (!id) return undefined

		const item = mediaItems.value?.edges.find(edge => {
			return edge.node.databaseId == id
		})?.node

		return {
			...item,
			mediaDetails: {
				...item?.mediaDetails,
				width: Number(item?.mediaDetails?.width || 0),
				height: Number(item?.mediaDetails?.height || 0),
			},
		}
	})

	return mediaData
}
