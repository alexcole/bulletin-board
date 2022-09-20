import { useDrop } from 'react-dnd'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import Image from 'next/image'
import trashIcon from '../public/trash.png'
import { PushPin, TextNote } from '../convex/schema'

export function TrashCan(props: { bulletinBoardId: string }) {
  const trash = useMutation('item:trash')
  const [, drop] = useDrop(
    () => ({
      accept: ['textNote', 'pushPin'],
      drop: (droppedItem: TextNote | PushPin) => {
        trash.withOptimisticUpdate((localStore) => {
          const items = localStore.getQuery('bulletinBoard:load', [
            props.bulletinBoardId,
          ])
          if (items !== undefined) {
            localStore.setQuery(
              'bulletinBoard:load',
              [props.bulletinBoardId],
              items.filter((item) => !item._id.equals(droppedItem._id))
            )
          }
        })(droppedItem._id)
      },
    }),
    []
  )
  return (
    <div ref={drop}>
      <Image alt="Trash Can" src={trashIcon} objectFit="cover" quality={100} />
    </div>
  )
}
