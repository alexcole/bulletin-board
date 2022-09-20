import { DatabaseReader, mutation, query } from './_generated/server'

export const create = mutation(async ({ db }, id: string) => {
  const bulletinBoard = db.insert('bulletinBoards', {
    id,
  })

  db.insert('items', {
    type: 'trashCan',
    bulletinBoard,
    position: {
      x: 0,
      y: 150,
      z: 0,
    },
  })

  db.insert('items', {
    type: 'notePad',
    bulletinBoard,
    position: {
      x: 0,
      y: 0,
      z: 1,
    },
  })

  db.insert('items', {
    type: 'pushPin',
    bulletinBoard,
    position: {
      x: 0,
      y: 300,
      z: 2,
    },
  })

  db.insert('items', {
    type: 'pushPinPile',
    bulletinBoard,
    position: {
      x: 0,
      y: 450,
      z: 3,
    },
  })
})

export function findById(db: DatabaseReader, id: string) {
  return db
    .table('bulletinBoards')
    .index('by_identifier')
    .range((q) => q.eq('id', id))
    .first()
}

export const load = query(async ({ db }, id: string) => {
  const bulletinBoard = await findById(db, id)

  if (bulletinBoard === null) {
    return []
  }

  return db
    .table('items')
    .index('by_bulletinBoard_z')
    .range((q) => q.eq('bulletinBoard', bulletinBoard._id))
    .collect()
})
