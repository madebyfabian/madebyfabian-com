import type { Maybe } from '@graphql-tools/utils'
import type { Block } from '@/types/gen/graphql/graphql'

export type ItemBase = {
	id: string
	name: string
}

export type InnerBlocksDefault<I> = Maybe<Array<I>>
export type InnerBlocksExtended = Maybe<Array<ItemBase & Block>>

export type BlockDefault = Block
