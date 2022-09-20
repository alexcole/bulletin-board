import { ReactElement } from 'react'
import { useDrop } from 'react-dnd'
import { Items, setPosition } from '../common/dragAndDrop'
import { useConvex } from '../convex/_generated/react'
import styles from './Canvas.module.css'
import { Document } from '../convex/_generated/dataModel'

export function Canvas(props: {
  children: ReactElement
  bulletinBoardId: string
}) {
  const convex = useConvex()
  const [, drop] = useDrop(
    () => ({
      accept: Items,
      drop: (item: Document<'items'>, monitor) => {
        const offset = monitor.getDifferenceFromInitialOffset()
        if (offset) {
          let { x, y } = offset
          setPosition(item._id, x, y, props.bulletinBoardId, convex)
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
