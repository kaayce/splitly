import { eq, and } from 'drizzle-orm'
import { db } from '@/db/dbClient'
import { Account, accounts } from '@/db/schema/accounts'

export const getAccountsByUserId = async (userId: string): Promise<Account[]> => {
  return db.select().from(accounts).where(eq(accounts.userId, userId))
}

export const getAccountById = async (
  userId: string,
  accountId: string
): Promise<Account | null> => {
  const [account] = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.userId, userId), eq(accounts.accountId, accountId)))
  return account || null
}

//  this gets the first account for a given user - future work can be to add a way to select a specific account
export const addAmount = async (userId: string, amount: number) => {
  return db.transaction(async (tx) => {
    const account = await tx
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1)
      .execute()
      .then((results) => results[0])
    if (account) {
      const newBalance = account.balance + amount
      await tx
        .update(accounts)
        .set({ balance: newBalance })
        .where(eq(accounts.accountId, account.accountId))
    }
  })
}

//  this gets the first account for a given user - future work can be to add a way to select a specific account
export const deductAmount = async (userId: string, amount: number) => {
  return db.transaction(async (tx) => {
    const [account] = await tx.select().from(accounts).where(eq(accounts.userId, userId))
    if (account) {
      const newBalance = account.balance - amount
      await tx
        .update(accounts)
        .set({ balance: newBalance })
        .where(eq(accounts.accountId, account.accountId))
    }
  })
}
