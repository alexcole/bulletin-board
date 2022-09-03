import { useDrop } from 'react-dnd'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { ItemTypes, textNoteType } from '../common/dragAndDrop'
import Image from 'next/image'
import trashIcon from '../public/trash.png'
import { TextNote } from '../convex/schema'

export function TrashCan(props: { bulletinBoardId: string }) {
  const trash = useMutation('textNote:trash')
  const [, drop] = useDrop(
    () => ({
      accept: textNoteType,
      drop: (textNote: TextNote) => {
        trash.withOptimisticUpdate((localStore) => {
          const items = localStore.getQuery('bulletinBoard:load', [
            props.bulletinBoardId,
          ])
          if (items !== undefined) {
            localStore.setQuery(
              'bulletinBoard:load',
              [props.bulletinBoardId],
              items.filter((item) => !item._id.equals(textNote._id))
            )
          }
        })(textNote._id)
      },
    }),
    []
  )
  return (
    <div ref={drop}>
      <Image alt="Trash Can" src={trashIcon} objectFit="cover" quality={100} />{' '}
    </div>
  )
}
