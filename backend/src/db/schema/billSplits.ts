import { pgTable, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

import { transactions } from './transactions'
import { users } from '@/db/schema/users'
import { lifecycleDates } from '@/db/schema/utils'
import { billParticipants } from '@/db/schema/billParticipants'
import { relations } from 'drizzle-orm'

export const billSplits = pgTable('bill_splits', {
  splitId: uuid('split_id').primaryKey().defaultRandom(),
  transactionId: uuid('transaction_id')
    .references(() => transactions.transactionId, { onDelete: 'cascade' })
    .notNull(),
  payerId: uuid('payer_id')
    .references(() => users.userId)
    .notNull(),
  totalAmount: integer('total_amount').notNull(),
  splitDate: timestamp('split_date').defaultNow(),
  ...lifecycleDates
})

export const billSplitsRelations = relations(billSplits, ({ one, many }) => ({
  transaction: one(transactions, {
    fields: [billSplits.transactionId],
    references: [transactions.transactionId]
  }),
  payer: one(users, { fields: [billSplits.payerId], references: [users.userId] }),
  participants: many(billParticipants)
}))

export type BillSplit = typeof billSplits.$inferSelect
