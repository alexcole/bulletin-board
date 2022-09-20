import { findById } from './bulletinBoard'
import { nextZIndex } from './item'
import { mutation } from './_generated/server'

export const create = mutation(
  async ({ db }, x: number, y: number, bulletinBoardId: string) => {
    const bulletinBoard = await findById(db, bulletinBoardId)

    db.insert('items', {
      type: 'pushPin',
      position: {
        x,
        y,
        z: await nextZIndex(db, bulletinBoard!._id),
      },
      bulletinBoard: bulletinBoard!._id,
    })
  }
)
