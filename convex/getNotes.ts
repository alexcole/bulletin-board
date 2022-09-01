import { query } from './_generated/server'

export default query(({ db }) => {
  return db.table('notes').collect()
})
