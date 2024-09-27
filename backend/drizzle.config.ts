import { defineConfig } from 'drizzle-kit'

import { databaseConfig } from './src/db/databaseConfig'

export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseConfig.connectionString!
  },
  verbose: true,
  strict: true
})
