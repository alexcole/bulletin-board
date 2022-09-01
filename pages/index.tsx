import type { NextPage } from 'next'
import { useQuery } from '../convex/_generated/react'
import { BulletinBoard } from '../components/BulletinBoard'
import { CreateNoteButton } from '../components/CreateNoteButton'

const Home: NextPage = () => {
  const notes = useQuery('getNotes')
  if (notes == undefined) {
    return <div>"loading..."</div>
  }
  return (
    <div>
      <CreateNoteButton />
      <BulletinBoard notes={notes} />
    </div>
  )
}

export default Home
