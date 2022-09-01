import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../common/dragAndDrop'
import { useMutation } from '../convex/_generated/react'
import { Id } from '../convex/_generated/dataModel'
import styles from './DropContainer.module.css'

export const DropContainer = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const setPosition = useMutation('note:setPosition')

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NOTE,
      drop: (id: Id<'notes'>, monitor) => {
        const offset = monitor.getClientOffset()
        if (offset) {
          let { x, y } = offset
          x = x - 35
          y = y - 40
          setPosition.withOptimisticUpdate((localStore) => {
            const notes = localStore.getQuery('getNotes', [])
            if (notes !== undefined) {
              const newNotes = []
              for (const note of notes) {
                if (note._id.equals(id)) {
                  newNotes.push({
                    ...note,
                    position: {
                      x,
                      y,
                    },
                  })
                } else {
                  newNotes.push(note)
                }
              }
              localStore.setQuery('getNotes', [], newNotes)
            }
          })(id, { x, y })
        }
      },
    }),
    []
  )

  return (
    <div ref={drop} className={styles.dropContainer}>
      {children}
    </div>
  )
}
