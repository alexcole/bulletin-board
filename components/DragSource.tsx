import { Document } from '../convex/_generated/dataModel'
import { ItemTypes } from '../common/dragAndDrop'
import { useDrag } from 'react-dnd'
import { Note } from './Note'

export const DragSource = (props: { note: Document<'notes'> }) => {
  const [_, drag] = useDrag(() => ({
    type: ItemTypes.NOTE,
    item: props.note._id,
  }))

  return (
    <div
      ref={drag}
      style={{
        transform: `translateX(${props.note.position.x}px) translateY(${props.note.position.y}px)`,
      }}
    >
      <Note note={props.note} />
    </div>
  )
}
