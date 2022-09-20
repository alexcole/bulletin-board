import { ConvexReactClient } from 'convex/react'
import { Id, Document } from '../convex/_generated/dataModel'
import { ConvexAPI } from '../convex/_generated/react'

// Stolen from https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type/55128956#55128956
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never
type Push<T extends any[], V> = [...T, V]
type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

export type ItemTypes = Document<'items'>['type']

export const Items: TuplifyUnion<ItemTypes> = [
  'textNote',
  'trashCan',
  'notePad',
  'pushPin',
  'pushPinPile',
]

export function setPosition(
  id: Id<'items'>,
  dx: number,
  dy: number,
  bulletinBoardId: string,
  convex: ConvexReactClient<ConvexAPI>
) {
  convex.mutation('item:setPosition').withOptimisticUpdate((localStore) => {
    const items = localStore.getQuery('bulletinBoard:load', [bulletinBoardId])
    if (items !== undefined) {
      const maxZ = Math.max(...items.map((i) => i.position.z))
      const newItems = []
      for (const otherItem of items) {
        if (otherItem._id.equals(id)) {
          newItems.push({
            ...otherItem,
            position: {
              x: otherItem.position.x + dx,
              y: otherItem.position.y + dy,
              z: maxZ + 1,
            },
          })
        } else {
          newItems.push(otherItem)
        }
      }
      localStore.setQuery('bulletinBoard:load', [bulletinBoardId], newItems)
    }
  })(id, dx, dy)
}
