import { mutation } from './_generated/server'
import { Id } from './_generated/dataModel'

export const create = mutation(({ db }) => {
  db.insert('notes', {
    text: '',
    type: 'text',
    position: {
      x: 0,
      y: 0,
    },
  })
})

export const setText = mutation(({ db }, id: Id<'notes'>, text: string) => {
  db.patch(id, { text })
})

export const setPosition = mutation(
  async ({ db }, id: Id<'notes'>, position: { x: number; y: number }) => {
    const note = (await db.get(id))!
    db.patch(id, {
      position,
    })
  }
)
