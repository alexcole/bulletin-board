import type { GetServerSideProps, NextPage } from 'next'
import { useQuery } from '../convex/_generated/react'
import { BulletinBoard } from '../components/BulletinBoard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Canvas } from '../components/Canvas'

const BulletinBoardPage = (props: { params: { bulletinBoardId: string } }) => {
  const items = useQuery('bulletinBoard:load', props.params.bulletinBoardId)

  if (items == undefined) {
    return <div>"loading..."</div>
  }

  return (
    <DndProvider backend={HTML5Backend} debugMode={true}>
      <Canvas bulletinBoardId={props.params.bulletinBoardId}>
        <BulletinBoard
          items={items}
          bulletinBoardId={props.params.bulletinBoardId}
        />
      </Canvas>
    </DndProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { params: context.params },
  }
}

export default BulletinBoardPage
