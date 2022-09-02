import { Document } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import styles from './TextNote.module.css'
import { useLayoutEffect, useRef } from 'react'
import { TextNote } from '../convex/schema'

export function TextNote(props: {
  textNote: TextNote
  bulletinBoardId: string
}) {
  const ref = useRef<any>(null)
  const setText = useMutation('textNote:setText')
  const updateText = (event: any) => {
    const text: string = event.target.value
    setText.withOptimisticUpdate((localStore) => {
      const notes = localStore.getQuery('bulletinBoard:load', [
        props.bulletinBoardId,
      ])
      if (notes !== undefined) {
        const newNotes: Document<'items'>[] = []
        for (const note of notes) {
          if (note._id.equals(props.textNote._id)) {
            newNotes.push({
              ...(note as TextNote),
              text,
            })
          } else {
            newNotes.push(note)
          }
        }
        localStore.setQuery(
          'bulletinBoard:load',
          [props.bulletinBoardId],
          newNotes
        )
      }
    })(props.textNote._id, text)
  }

  useLayoutEffect(() => {
    ref.current.style.height = 'inherit'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  })
  return (
    <textarea
      ref={ref}
      value={props.textNote.text}
      onChange={updateText}
      className={styles.note}
    />
  )
}
