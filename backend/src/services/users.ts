import { eq } from 'drizzle-orm'

import { db } from '../db/dbClient'
import { User, users } from '../db/schema/users'

export const getUserById = async (userId: string): Promise<User | undefined> => {
  const result = await db.select().from(users).where(eq(users.userId, userId))
  return result[0]
}

export const getAllUsers = async (): Promise<User[] | undefined> => {
  const results = await db.select().from(users)
  return results
}
