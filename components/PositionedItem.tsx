import { ReactElement } from 'react'
import { Document } from '../convex/_generated/dataModel'

export const PositionedItem = (props: {
  item: Document<'items'>
  children: ReactElement
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.item.position.x}px`,
        top: `${props.item.position.y}px`,
        zIndex: props.item.position.z,
      }}
    >
      {props.children}
    </div>
  )
}
