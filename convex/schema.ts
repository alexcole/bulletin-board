import { defineSchema, defineTable, s, SchemaType } from 'convex/schema'
import { Id } from './_generated/dataModel'

const position = s.object({
  x: s.number(),
  y: s.number(),
  z: s.number(),
})

const textNote = s.object({
  type: s.literal('textNote'),
  text: s.string(),
  position,
  bulletinBoard: s.id('bulletinBoards'),
})

export type TextNote = Infer<typeof textNote>

const trashCan = s.object({
  type: s.literal('trashCan'),
  position,
  bulletinBoard: s.id('bulletinBoards'),
})

export type TrashCan = Infer<typeof trashCan>

const notePad = s.object({
  type: s.literal('notePad'),
  position,
  bulletinBoard: s.id('bulletinBoards'),
})

export type NotePad = Infer<typeof notePad>

const pushPin = s.object({
  type: s.literal('pushPin'),
  position,
  bulletinBoard: s.id('bulletinBoards'),
})

export type PushPin = Infer<typeof pushPin>

const pushPinPile = s.object({
  type: s.literal('pushPinPile'),
  position,
  bulletinBoard: s.id('bulletinBoards'),
})

export type PushPinPile = Infer<typeof pushPinPile>

export default defineSchema({
  items: defineTable(
    s.union(textNote, trashCan, notePad, pushPin, pushPinPile)
  ).index('by_bulletinBoard_z', ['bulletinBoard', 'position.z']),
  bulletinBoards: defineTable({
    id: s.string(),
  }).index('by_identifier', ['id']),
})

type Infer<SType extends SchemaType<any, any>> = SType extends SchemaType<
  infer DocumentType,
  any
>
  ? { _id: Id<'items'>; _creationTime: number } & DocumentType
  : never
