import type { ItemBase, InnerBlocksDefault, BlockDefault } from '@/types'
import { generalRouter } from '@/server/trpc/routers/general'

type Item = ItemBase & {
	block: BlockDefault
	innerBlocks: InnerBlocksDefault<Item>
}

type ImageId = string

type BlockRawItem = Pick<BlockDefault, 'attributesJSON' | 'name' | 'innerBlocks'>

const uid = () => Math.random().toString(36).slice(2, 9)

type ParseItemJsonProps = {
	item: BlockRawItem
}

const parseItemJson = ({ item }: ParseItemJsonProps) => {
	let itemImageId: ImageId | undefined

	const newItem: Item = {
		id: uid(),
		name: item.name,
		block: JSON.parse(item.attributesJSON || '{}'),
		innerBlocks: undefined,
	}

	if (newItem.name === 'core/image' && 'id' in newItem.block && typeof newItem.block.id === 'number') {
		itemImageId = String(newItem.block.id)
	}

	if (!('innerBlocks' in item)) return { newItem, itemImageId }

	let innerBlocks: Item[] = []
	let innerItemImageIds: ImageId[] = []
	for (const innerItem of item.innerBlocks || []) {
		const newInnerItem = parseItemJson({ item: innerItem })
		if (newInnerItem.itemImageId) {
			innerItemImageIds.push(newInnerItem.itemImageId)
		}
		innerBlocks.push(newInnerItem.newItem)
	}

	newItem.innerBlocks = innerBlocks
	return { newItem, itemImageId }
}

export type GenerateBlocksDataProps = {
	blocksRaw?: BlockRawItem[] | undefined
}

const generateData = ({ blocksRaw }: GenerateBlocksDataProps) => {
	let res: {
		blocks: Item[]
		imageIds: ImageId[]
	} = {
		blocks: [],
		imageIds: [],
	}
	if (!Array.isArray(blocksRaw) || !blocksRaw.length) return res

	for (const item of blocksRaw) {
		const newItem = parseItemJson({ item })
		if (newItem.itemImageId) {
			res.imageIds.push(newItem.itemImageId)
		}
		res.blocks.push(newItem.newItem)
	}

	return res
}

export const generateBlocksData = async ({
	blocksRaw,
	ctx,
}: {
	blocksRaw: GenerateBlocksDataProps['blocksRaw']
	/** trpc context */
	ctx: any
}) => {
	if (!blocksRaw) return { blocks: [], mediaItems: undefined }

	const { blocks, imageIds } = generateData({ blocksRaw })
	if (imageIds.length) {
		// Map through all content to get all images Ids.
		// This is necessary since the GraphQL API has a bug where it cannot
		// display image info like height/width, or srcsets for example.
		const generalCaller = generalRouter.createCaller(ctx)
		const { mediaItems } = await generalCaller.mediaItems({ imageIds })
		return { blocks, mediaItems }
	}

	return { blocks, mediaItems: undefined }
}

export type GenerateBlocksDataReturnType = Awaited<ReturnType<typeof generateBlocksData>>
