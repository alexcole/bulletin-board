import { useMutation } from '../convex/_generated/react'
import { useCallback } from 'react'
import styles from './Note.module.css'

export function CreateNoteButton() {
  const createNote = useMutation('note:create')
  const onClick = useCallback(() => createNote(), [])
  return (
    <button onClick={onClick} className={styles.createNoteButton}>
      Create New Note
    </button>
  )
}
