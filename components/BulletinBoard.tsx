import { Document } from '../convex/_generated/dataModel'
import { DragSource } from './DragSource'

export function BulletinBoard({ notes }: { notes: Document<'notes'>[] }) {
  return (
    <div>
      {notes.map((note) => (
        <DragSource note={note} key={note._id.toString()} />
      ))}
    </div>
  )
}
