import { Document } from '../convex/_generated/dataModel'
import { Note } from './Note'

export function BulletinBoard({ notes }: { notes: Document<'notes'>[] }) {
  return (
    <div>
      {notes.map((note) => (
        <Note note={note} key={note._id.toString()} />
      ))}
    </div>
  )
}
