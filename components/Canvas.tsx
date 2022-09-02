import { ReactElement } from 'react'
import { useDrop } from 'react-dnd'
import { Items } from '../common/dragAndDrop'
import { useMutation } from '../convex/_generated/react'
import styles from './Canvas.module.css'
import { Document } from '../convex/_generated/dataModel'

export function Canvas(props: {
  children: ReactElement
  bulletinBoardId: string
}) {
  const setPosition = useMutation('item:setPosition')

  const [, drop] = useDrop(
    () => ({
      accept: Items,
      drop: (item: Document<'items'>, monitor) => {
        const offset = monitor.getDifferenceFromInitialOffset()
        if (offset) {
          let { x, y } = offset
          setPosition.withOptimisticUpdate((localStore) => {
            const items = localStore.getQuery('bulletinBoard:load', [
              props.bulletinBoardId,
            ])
            if (items !== undefined) {
              const newItems = []
              for (const otherItem of items) {
                if (otherItem._id.equals(item._id)) {
                  newItems.push({
                    ...otherItem,
                    position: {
                      x: otherItem.position.x + x,
                      y: otherItem.position.y + y,
                      z: 1000,
                    },
                  })
                } else {
                  newItems.push(otherItem)
                }
              }
              localStore.setQuery(
                'bulletinBoard:load',
                [props.bulletinBoardId],
                newItems
              )
            }
          })(item._id, { x, y })
        }
      },
    }),
    []
  )

  return (
    <div ref={drop} className={styles.canvas}>
      {props.children}
    </div>
  )
}
