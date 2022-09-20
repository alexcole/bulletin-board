import { Document } from '../convex/_generated/dataModel'
import { ItemTypes, setPosition } from '../common/dragAndDrop'
import { useDrag } from 'react-dnd'
import { ReactElement } from 'react'
import { useConvex } from '../convex/_generated/react'

export function DragSource(props: {
  dndItemType: ItemTypes
  dndItem: Document<'items'>
  children: ReactElement
  bulletinBoardId: string
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

  const convex = useConvex()
  const onClick = () => {
    setPosition(props.dndItem._id, 0, 0, props.bulletinBoardId, convex)
  }

  return (
    <div
      ref={drag} // Use `onClickCapture` so that this `onClick` handler fires before any child components.
      onClickCapture={onClick}
    >
      {!isDragging ? props.children : null}
    </div>
  )
}
