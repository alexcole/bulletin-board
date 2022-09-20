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
  async ({ db }, id: Id<'items'>, dx: number, dy: number) => {
    const item = (await db.get(id))!

    db.patch(id, {
      position: {
        x: item.position.x + dx,
        y: item.position.y + dy,
        z: await nextZIndex(db, item.bulletinBoard),
      },
    })
  }
)

export const trash = mutation(({ db }, id: Id<'items'>) => {
  db.delete(id)
})
