import type { Maybe } from '@graphql-tools/utils'

export * from '#graphql-operations'
import type { CoreBlock } from '#graphql-operations'

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>
	  }
	: T

export type ItemBase = {
	id: string
	name: string
}

export type InnerBlocksDefault<I> = Maybe<Array<I>>
export type BlockDefault = CoreBlock

type InnerBlocksExtended<BlockGeneric> = Maybe<Array<ItemBase & BlockGeneric>>

export type RichtextPropsBase<
	AttributesGeneric extends { innerBlocks?: unknown; attributes?: unknown },
	SpecificInnerBlocksGeneric = void
> = SpecificInnerBlocksGeneric extends void
	? {
			innerBlocks?: InnerBlocksExtended<AttributesGeneric['innerBlocks']>
			attributes: AttributesGeneric['attributes']
	  }
	: {
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
