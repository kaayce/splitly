import { pgTable, text, integer, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core'

import { lifecycleDates } from './utils'
import { accounts } from './accounts'

export const categoryEnum = pgEnum('category', [
  'dining',
  'entertainment',
  'groceries',
  'utilities',
  'other'
])

export const transactions = pgTable('transactions', {
  transactionId: uuid('transaction_id').primaryKey().defaultRandom(),
  accountId: uuid('account_id')
    .references(() => accounts.accountId, { onDelete: 'cascade' })
    .notNull(),
  category: categoryEnum('category').notNull(),
  vendor: text('vendor').notNull(),
  amount: integer('amount').notNull(),
  transactionDate: timestamp('transaction_date').defaultNow(),
  ...lifecycleDates
})

export type Transaction = typeof transactions.$inferSelect
