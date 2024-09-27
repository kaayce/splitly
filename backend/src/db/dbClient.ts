import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import { databaseConfig } from './databaseConfig'
import * as schema from './schema'
import { DBLogger } from '@/services/logger'

const { Pool } = pg
const pool = new Pool(databaseConfig)

export const db = drizzle(pool, {
  schema,
  logger: new DBLogger()
})
