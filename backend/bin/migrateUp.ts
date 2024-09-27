import 'dotenv/config'
import { migrateDb } from '../src/db/migrate'

const executeMigration = async () => {
  console.log('Migrating database...')
  await migrateDb()

  console.log('Migration complete.')
}

executeMigration().catch((error) => {
  console.error(error)
  process.exit(1)
})
