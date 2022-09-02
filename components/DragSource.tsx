import { Document } from '../convex/_generated/dataModel'
import { ItemTypes } from '../common/dragAndDrop'
import { useDrag } from 'react-dnd'
import { Note } from './Note'

export const DragSource = (props: { note: Document<'notes'> }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NOTE,
    item: props.note._id,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  return (
    <div
      ref={drag}
      style={{
        left: `${props.note.position.x}px`,
        top: `${props.note.position.y}px`,
        position: 'absolute',
      }}
    >
      {!isDragging ? <Note note={props.note} /> : null}
    </div>
  )
}
