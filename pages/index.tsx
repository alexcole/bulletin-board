import type { NextPage } from 'next'
import { useQuery } from '../convex/_generated/react'
import { BulletinBoard } from '../components/BulletinBoard'
import { CreateNoteButton } from '../components/CreateNoteButton'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DropContainer } from '../components/DropContainer'
const Home: NextPage = () => {
  const notes = useQuery('getNotes')

  if (notes == undefined) {
    return <div>"loading..."</div>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DropContainer>
        <>
          <CreateNoteButton />

          <BulletinBoard notes={notes} />
        </>
      </DropContainer>
    </DndProvider>
  )
}

export default Home
