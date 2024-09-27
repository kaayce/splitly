import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { lifecycleDates } from './utils'
import { accounts } from './accounts'
import { billParticipants } from './billParticipants'
import { billSplits } from './billSplits'
import { friends } from './friends'
import { transactions } from './transactions'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  userId: uuid('user_id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 100 }).unique().notNull(),
  fullName: varchar('full_name', { length: 512 }).notNull(),
  ...lifecycleDates
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  transactions: many(transactions),
  payerBillSplits: many(billSplits),
  friends: many(friends),
  billParticipants: many(billParticipants)
}))

export type User = typeof users.$inferSelect
