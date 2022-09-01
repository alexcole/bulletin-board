// Stolen from https://javascript.plainenglish.io/how-to-make-a-simple-custom-drag-to-move-component-in-react-f67d5c99f925
import React, { useEffect, useState } from 'react'

export default function DragMove({ onDragMove, children }: any) {
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e: any) => {
    setIsDragging(true)
  }

  const handlePointerUp = (e: any) => {
    setIsDragging(false)
  }

  const handlePointerMove = (e: any) => {
    if (isDragging) onDragMove(e)
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <div onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}>
      {children}
    </div>
  )
}
