import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '../convex/_generated/react'

function makeid(length: number) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const HomePage: NextPage = () => {
  const create = useMutation('bulletinBoard:create')
  const router = useRouter()
  const onClick = () => {
    const id = makeid(5)
    create(id)
    router.push(`/${id}`)
  }
  return <button onClick={onClick}>Create New Bulletin Board</button>
}

export default HomePage
