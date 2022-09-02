import { Id } from './_generated/dataModel'
import { DatabaseReader, mutation } from './_generated/server'

export async function nextZIndex(
  db: DatabaseReader,
  bulletinBoardId: Id<'bulletinBoards'>
) {
  const highestItem = (await db
    .table('items')
    .index('by_bulletinBoard_z')
    .range((q) => q.eq('bulletinBoard', bulletinBoardId))
    .order('desc')
    .first())!
  return highestItem.position.z + 1
}

export const setPosition = mutation(
  async ({ db }, id: Id<'items'>, position: { x: number; y: number }) => {
    const item = (await db.get(id))!

    db.patch(id, {
      position: {
        x: item.position.x + position.x,
        y: item.position.y + position.y,
        z: await nextZIndex(db, item.bulletinBoard),
      },
    })
  }
)
