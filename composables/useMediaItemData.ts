import type { RichtextPropsMinimum } from '@/types'
import type { GenerateBlocksDataReturnType } from '@/server/utils/generateBlocksData'

/**
 * Used to get an array of media items out of the store.
 */
export const useMediaItemData = ({
	key,
	id,
}: {
	key: RichtextPropsMinimum['mediaItemsStorageKey']
	id: number | undefined | null
}) => {
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
