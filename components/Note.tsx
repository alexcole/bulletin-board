import { Document } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import styles from './Note.module.css'
import { useLayoutEffect, useRef } from 'react'

export function Note(props: { note: Document<'notes'> }) {
  const ref = useRef<any>(null)
  const setText = useMutation('note:setText')
  const updateText = (event: any) => {
    const text = event.target.value
    setText.withOptimisticUpdate((localStore) => {
      const notes = localStore.getQuery('getNotes', [])
      if (notes !== undefined) {
        const newNotes = []
        for (const note of notes) {
          if (note._id.equals(props.note._id)) {
            newNotes.push({
              ...note,
              text,
            })
          } else {
            newNotes.push(note)
          }
        }
        localStore.setQuery('getNotes', [], newNotes)
      }
    })(props.note._id, text)
  }

  useLayoutEffect(() => {
    ref.current.style.height = 'inherit'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  })
  return (
    <textarea
      ref={ref}
      value={props.note.text}
      onChange={updateText}
      className={styles.note}
      
    />
  )
}
