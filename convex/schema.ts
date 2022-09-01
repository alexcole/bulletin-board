import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  notes: defineTable({
    type: s.literal('text'),
    position: s.object({
      x: s.number(),
      y: s.number(),
    }),
    text: s.string(),
  }),
})
