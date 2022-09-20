import { useEffect, useRef, useState } from 'react'
import { PushPin as PushPinType } from '../convex/schema'
import { Document } from '../convex/_generated/dataModel'
import { DragSource } from './DragSource'
import { NotePad } from './NotePad'
import { PositionedItem } from './PositionedItem'
import { PushPin } from './PushPin'
import { PushPinPile } from './PushPinPile'
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
    case 'pushPin':
      return <PushPin />
    case 'pushPinPile':
      return (
        <PushPinPile
          pushPinPile={props.item}
          bulletinBoardId={props.bulletinBoardId}
        />
      )
  }
}

function MaybeDraggableItem(props: {
  item: Document<'items'>
  pushPins: PushPinType[]
  bulletinBoardId: string
}) {
  const [isPinned, setPinned] = useState(false)
  const ref = useRef<any>(null)
  useEffect(() => {
    if (props.item.type == 'textNote') {
      for (const pushPin of props.pushPins) {
        const pinX = pushPin.position.x + 5
        const pinY = pushPin.position.y + 35

        if (
          pinX > props.item.position.x &&
          pinX < props.item.position.x + ref.current.offsetWidth &&
          pinY > props.item.position.y &&
          pinY < props.item.position.y + ref.current.offsetHeight &&
          pushPin.position.z > props.item.position.z
        ) {
          setPinned(true)
          return
        }
      }
      setPinned(false)
    }
  }, [props, setPinned])

  if (isPinned)
    return (
      <div ref={ref}>
        <Item item={props.item} bulletinBoardId={props.bulletinBoardId} />
      </div>
    )
  else {
    return (
      <div ref={ref}>
        <DragSource
          dndItem={props.item}
          dndItemType={props.item.type}
          bulletinBoardId={props.bulletinBoardId}
        >
          <Item item={props.item} bulletinBoardId={props.bulletinBoardId} />
        </DragSource>
      </div>
    )
  }
}

export function BulletinBoard(props: {
  items: Document<'items'>[]
  bulletinBoardId: string
}) {
  const pushPins = props.items.filter(
    (item): item is PushPinType => item.type === 'pushPin'
  )

  return (
    <div>
      {props.items.map((item) => {
        return (
          <PositionedItem key={item._id.toString()} item={item}>
            <MaybeDraggableItem
              item={item}
              pushPins={pushPins}
              bulletinBoardId={props.bulletinBoardId}
            />
          </PositionedItem>
        )
      })}
    </div>
  )
}
