import { Document } from '../convex/_generated/dataModel'
import { ItemTypes } from '../common/dragAndDrop'
import { useDrag } from 'react-dnd'
import { ReactElement } from 'react'
import styles from './DragSource.module.css'

export function DragSource(props: {
  dndItemType: ItemTypes
  dndItem: Document<'items'>
  children: ReactElement
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.dndItemType,
    item: props.dndItem,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  return (
    <div
      ref={drag}
      className={styles.dragSource}
      style={{
        left: `${props.dndItem.position.x}px`,
        top: `${props.dndItem.position.y}px`,
        zIndex: props.dndItem.position.z,
      }}
    >
      {!isDragging ? props.children : null}
    </div>
  )
}
