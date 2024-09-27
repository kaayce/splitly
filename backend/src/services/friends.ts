import { eq } from 'drizzle-orm'

import { db } from '../db/dbClient'
import { friends } from '../db/schema/friends'
import { users } from '@/db/schema/users'

export interface FriendDetail {
  friendId: string
  userId: string
  fullName: string
  email: string
}

export const getFriendsByUserId = async (userId: string): Promise<FriendDetail[]> => {
  const result = await db
    .select()
    .from(friends)
    .innerJoin(users, eq(friends.friendId, users.userId))
    .where(eq(friends.userId, userId))

  return result.map(({ users, friends }) => ({
    friendId: friends.friendId,
    userId: friends.userId,
    fullName: users.fullName,
    email: users.email
  }))
}
