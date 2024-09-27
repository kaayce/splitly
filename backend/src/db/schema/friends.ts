import { pgTable, uuid, uniqueIndex } from 'drizzle-orm/pg-core'

import { lifecycleDates } from './utils'
import { users } from '@/db/schema/users'
import { relations } from 'drizzle-orm'

export const friends = pgTable('friends', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.userId, { onDelete: 'cascade' })
    .notNull(),
  friendId: uuid('friend_id')
    .references(() => users.userId, { onDelete: 'cascade' })
    .notNull(),
  ...lifecycleDates
}, (table) => {
  return {
    userFriendUnique: uniqueIndex('user_friend_unique').on(table.userId, table.friendId)
  }
})

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, { fields: [friends.userId], references: [users.userId] }),
  friend: one(users, { fields: [friends.friendId], references: [users.userId] })
}))

export type Friend = typeof friends.$inferSelect
