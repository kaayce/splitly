import { relations } from 'drizzle-orm'
import { pgTable, integer, pgEnum, uuid, varchar } from 'drizzle-orm/pg-core'

import { lifecycleDates } from './utils'
import { users } from './users'
import { transactions } from '@/db/schema/transactions'

const generateRandomAccountNumber = (): string => {
  // Generate a random number and convert it to string, padding with leading zeros if necessary
  return Math.floor(10000000000 + Math.random() * 90000000000).toString()
}

export const accountTypeEnum = pgEnum('account_type', ['checking', 'savings'])

// assumes all accounts in CAD$
export const accounts = pgTable('bank_accounts', {
  accountId: uuid('account_id').primaryKey().defaultRandom(),
  accountNumber: varchar('account_number', { length: 12 })
    .notNull()
    .unique()
    .$defaultFn(() => generateRandomAccountNumber()),
  userId: uuid('user_id')
    .references(() => users.userId, { onDelete: 'cascade' })
    .notNull(),
  accountType: accountTypeEnum('account_type').notNull().default('checking'),
  balance: integer('balance').notNull(),
  ...lifecycleDates
})

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.userId] }),
  transactions: many(transactions)
}))

export type Account = typeof accounts.$inferSelect
