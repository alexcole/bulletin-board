import { Document } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import styles from './Note.module.css'
import DragMove from './DragMove'
import { useLayoutEffect, useRef } from 'react'

export function Note(props: { note: Document<'notes'> }) {
  const ref = useRef<any>(null)
  const setText = useMutation('note:setText')
  const updateText = (event: any) => {
    // event.target.style.height = 'inherit'
    // event.target.style.height = `${event.target.scrollHeight}px`

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
  const setPosition = useMutation('note:setPosition')
  const handleDragMove = (e: any) => {
    setPosition.withOptimisticUpdate((localStore) => {
      const notes = localStore.getQuery('getNotes', [])
      if (notes !== undefined) {
        const newNotes = []
        for (const note of notes) {
          if (note._id.equals(props.note._id)) {
            newNotes.push({
              ...note,
              position: {
                x: note.position.x + e.movementX,
                y: note.position.y + e.movementY,
              },
            })
          } else {
            newNotes.push(note)
          }
        }
        localStore.setQuery('getNotes', [], newNotes)
      }
    })(props.note._id, { dx: e.movementX, dy: e.movementY })
  }

  return (
    <DragMove onDragMove={handleDragMove}>
      <textarea
        ref={ref}
        value={props.note.text}
        onChange={updateText}
        className={styles.note}
        style={{
          transform: `translateX(${props.note.position.x}px) translateY(${props.note.position.y}px)`,
        }}
      />
    </DragMove>
  )
}
