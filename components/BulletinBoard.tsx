import { Document } from '../convex/_generated/dataModel'
import { DragSource } from './DragSource'
import { NotePad } from './NotePad'
import { TextNote } from './TextNote'
import { TrashCan } from './TrashCan'

function Item(props: { item: Document<'items'>; bulletinBoardId: string }) {
  switch (props.item.type) {
    case 'textNote':
      return (
        <TextNote
          textNote={props.item}
          bulletinBoardId={props.bulletinBoardId}
        />
      )
    case 'trashCan':
      return <TrashCan bulletinBoardId={props.bulletinBoardId} />
    case 'notePad':
      return (
        <NotePad notePad={props.item} bulletinBoardId={props.bulletinBoardId} />
      )
  }
}

export function BulletinBoard(props: {
  items: Document<'items'>[]
  bulletinBoardId: string
}) {
  return (
    <div>
      {props.items.map((item) => {
        return (
          <DragSource
            dndItem={item}
            dndItemType={item.type}
            key={item._id.toString()}
          >
            <Item item={item} bulletinBoardId={props.bulletinBoardId} />
          </DragSource>
        )
      })}
    </div>
  )
}
