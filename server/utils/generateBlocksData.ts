import type { ItemBase, InnerBlocksDefault, BlockDefault, CoreImageBlock, UbTableOfContentsHeaderEntry } from '@/types'
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

const decodeAndParseLazyblockImageField = (imageField: string) => {
	try {
		const decoded = decodeURI(imageField)
		const json = JSON.parse(decoded || '{}')
		return json as CoreImageBlock['attributes'] | undefined
	} catch (_) {
		return undefined
	}
}

const parseUbTableOfContentsHeaderEntriesField = (headerEntries: string) => {
	try {
		const json = JSON.parse(headerEntries || '{}')
		const data = json as UbTableOfContentsHeaderEntry[] | undefined

		const filteredOnlyTopLevelTags = data?.filter(entry => typeof entry.tag === 'number' && entry.level === 0)
		return filteredOnlyTopLevelTags
	} catch (_) {
		return undefined
	}
}

const parseItemJson = ({ item }: ParseItemJsonProps) => {
	let itemImageId: ImageId | undefined

	const newItem: Item = {
		id: uid(),
		name: item.name,
		block: JSON.parse(item.attributesJSON || '{}'),
		innerBlocks: undefined,
	}

	// Lazyblock fields can contain images, which we have to decode and parse
	// Since we get a url-ified + stringified JSON.
	if (item.name.startsWith('lazyblock/') && 'image' in newItem.block && typeof newItem.block.image === 'string') {
		const imageEntryRaw = newItem.block.image
		newItem.block = {
			...newItem.block,

			// @ts-expect-error This is allowed.
			image: decodeAndParseLazyblockImageField(imageEntryRaw),
		}
	}

	// Heroic Table of Contents block has a headerEntries field, which we have to parse
	// Since we get a stringified JSON.
	if (
		item.name === 'ht/block-toc' &&
		'headerEntries' in newItem.block &&
		typeof newItem.block.headerEntries === 'string'
	) {
		newItem.block = {
			...newItem.block,
			// @ts-expect-error This is allowed.
			headerEntries: parseUbTableOfContentsHeaderEntriesField(newItem.block.headerEntries),
		}
	}

	// These blocks contain some raw image data, where we want to fetch the media items details.
	const blocksWithImageData = ['core/image', 'lazyblock/project-item']
	if (blocksWithImageData.includes(item.name) && 'id' in newItem.block && typeof newItem.block.id === 'number') {
		switch (item.name) {
			case 'core/image': {
				itemImageId = String(newItem.block.id)
				break
			}

			case 'lazyblock/project-item': {
				// @ts-expect-error This is allowed.
				itemImageId = String(newItem.block.image.id)
				break
			}
		}
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
