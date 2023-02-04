import type { Maybe } from '@graphql-tools/utils'
import type { Block } from '@/types'

export * from '@/graphql/graphql'

export type ItemBase = {
	id: string
	name: string
}

export type InnerBlocksDefault<I> = Maybe<Array<I>>
export type BlockDefault = Block

type InnerBlocksExtended<BlockGeneric> = Maybe<Array<ItemBase & BlockGeneric>>

export type RichtextPropsMinimum = {
	mediaItemsStorageKey: string
}

export type RichtextPropsBase<
	AttributesGeneric extends { innerBlocks?: unknown; attributes?: unknown },
	SpecificInnerBlocksGeneric = void
> = SpecificInnerBlocksGeneric extends void
	? RichtextPropsMinimum & {
			innerBlocks?: InnerBlocksExtended<AttributesGeneric['innerBlocks']>
			attributes: AttributesGeneric['attributes']
	  }
	: RichtextPropsMinimum & {
			innerBlocks?: SpecificInnerBlocksGeneric
			attributes: AttributesGeneric['attributes']
	  }

export type UbTableOfContentsHeaderEntry = {
	tag?: number
	text: string
	link: string
	labelTOC: string
	visibleTOC: number
	level: number
	children: UbTableOfContentsHeaderEntry[]
}
