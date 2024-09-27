import 'dotenv/config'
import path from 'path'
import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { fileURLToPath } from 'url'

import { databaseConfig } from './databaseConfig'
import * as schema from './schema'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const migrateDb = async () => {
  const { Pool } = pg
  const pool = new Pool({ ...databaseConfig, max: 1 })
  const db = drizzle(pool, { schema })

  try {
    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, './migrations'),
      migrationsTable: 'drizzle_migrations'
    })
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await pool.end()
  }
}

export { migrateDb }
