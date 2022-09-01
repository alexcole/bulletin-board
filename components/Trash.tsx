import styles from './Trash.module.css'
import { useDrop } from 'react-dnd'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { ItemTypes } from '../common/dragAndDrop'

export function Trash() {
  const trash = useMutation('note:trash')
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NOTE,
      drop: (id: Id<'notes'>) => {
        trash(id)
      },
    }),
    []
  )
  return (
    <div className={styles.trash} ref={drop}>
      Trash
    </div>
  )
}
