import Image from 'next/image'
import { useMutation } from '../convex/_generated/react'
import notePad from '../public/note-pad.png'
import { NotePad as NotePadType, TextNote } from '../convex/schema'
import { Document, Id } from '../convex/_generated/dataModel'

export function NotePad(props: {
  notePad: NotePadType
  bulletinBoardId: string
}) {
  const createNote = useMutation('textNote:create')

  const onClick = () => {
    const x = props.notePad.position.x
    const y = props.notePad.position.y
    const z = 1000

    createNote.withOptimisticUpdate((localStore) => {
      const items = localStore.getQuery('bulletinBoard:load', [
        props.bulletinBoardId,
      ])
      if (!(items === undefined)) {
        const textNote: TextNote = {
          type: 'textNote',
          position: {
            x,
            y,
            z,
          },
          text: '',
          bulletinBoard: props.notePad.bulletinBoard,
          _id: new Id('items', crypto.randomUUID()),
          _creationTime: Date.now(),
        }

        const newItems: Document<'items'>[] = [...items, textNote]
        localStore.setQuery(
          'bulletinBoard:load',
          [props.bulletinBoardId],
          newItems
        )
      }
    })(x, y, props.bulletinBoardId)
  }

  return (
    <Image
      alt="Note Pad"
      src={notePad}
      objectFit="cover"
      quality={100}
      onClick={onClick}
    />
  )
}
