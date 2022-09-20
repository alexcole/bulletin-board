import Image from 'next/image'
import { PushPin, PushPinPile as PushPinPileType } from '../convex/schema'
import { Id, Document } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import pushPinIcon from '../public/push-pin.png'

const PINS = [
  {
    dx: 0,
    dy: 0,
    rotation: 'rotate(170deg)',
    key: 1,
  },
  {
    dx: 0,
    dy: 5,
    rotation: 'rotate(80deg)',
    key: 2,
  },
  {
    dx: 6,
    dy: 0,
    rotation: 'rotate(200deg)',
    key: 3,
  },
  {
    dx: 5,
    dy: 0,
    rotation: 'rotate(20deg)',
    key: 4,
  },
  {
    dx: 5,
    dy: 5,
    rotation: 'rotate(300deg)',
    key: 5,
  },
]

export const PushPinPile = (props: {
  pushPinPile: PushPinPileType
  bulletinBoardId: string
}) => {
  const createPushPin = useMutation('pushPin:create')

  const onClick = () => {
    const x = props.pushPinPile.position.x
    const y = props.pushPinPile.position.y
    const z = 1000

    createPushPin.withOptimisticUpdate((localStore) => {
      const items = localStore.getQuery('bulletinBoard:load', [
        props.bulletinBoardId,
      ])
      if (!(items === undefined)) {
        const pushPin: PushPin = {
          type: 'pushPin',
          position: {
            x,
            y,
            z,
          },
          bulletinBoard: props.pushPinPile.bulletinBoard,
          _id: new Id('items', crypto.randomUUID()),
          _creationTime: Date.now(),
        }

        const newItems: Document<'items'>[] = [...items, pushPin]
        localStore.setQuery(
          'bulletinBoard:load',
          [props.bulletinBoardId],
          newItems
        )
      }
    })(x, y, props.bulletinBoardId)
  }

  return (
    <div style={{ display: 'grid' }} onClick={onClick}>
      {PINS.map(({ dx, dy, rotation, key }) => (
        <div
          style={{
            gridColumn: 1,
            gridRow: 1,
            transform: rotation,
            position: 'relative',
            left: dx,
            top: dy,
          }}
          key={key}
        >
          <Image
            alt="Push Pin"
            src={pushPinIcon}
            objectFit="cover"
            quality={100}
          />
        </div>
      ))}
    </div>
  )
}
