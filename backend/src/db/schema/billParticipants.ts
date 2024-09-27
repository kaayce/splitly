import { relations } from 'drizzle-orm'
import { pgTable, uuid, integer, pgEnum } from 'drizzle-orm/pg-core'

import { users } from './users'
import { lifecycleDates } from './utils'
import { billSplits } from './billSplits'

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'rejected'])

export const billParticipants = pgTable('bill_participants', {
  billParticipantId: uuid('bill_participant_id').primaryKey().defaultRandom(),
  splitId: uuid('split_id')
    .references(() => billSplits.splitId, { onDelete: 'cascade' })
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.userId)
    .notNull(),
  amountOwed: integer('amount_owed').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
  ...lifecycleDates
})

export const billParticipantsRelations = relations(billParticipants, ({ one }) => ({
  billSplit: one(billSplits, {
    fields: [billParticipants.splitId],
    references: [billSplits.splitId]
  }),
  user: one(users, { fields: [billParticipants.userId], references: [users.userId] })
}))

export type BillParticipant = typeof billParticipants.$inferSelect
