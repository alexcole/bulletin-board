import { mutation } from './_generated/server'
import { Document, Id } from './_generated/dataModel'
import { findById } from './bulletinBoard'
import { nextZIndex } from './item'

export const create = mutation(
  async ({ db }, x: number, y: number, bulletinBoardId: string) => {
    const bulletinBoard = await findById(db, bulletinBoardId)

    db.insert('items', <Document<'items'>>{
      text: '',
      type: 'textNote',
      position: {
        x,
        y,
        z: await nextZIndex(db, bulletinBoard!._id),
      },
      bulletinBoard: bulletinBoard!._id,
    })
  }
)

export const setText = mutation(({ db }, id: Id<'items'>, text: string) => {
  db.patch(id, <any>{ text })
})

export const trash = mutation(({ db }, id: Id<'items'>) => {
  db.delete(id)
})
