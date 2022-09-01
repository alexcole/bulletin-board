import { useMutation } from '../convex/_generated/react'
import { useCallback } from 'react'

export function CreateNoteButton() {
  const createNote = useMutation('note:create')
  const onClick = useCallback(() => createNote(), [])
  return <button onClick={onClick}>Create New Note</button>
}
