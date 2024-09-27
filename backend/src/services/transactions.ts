import { eq } from 'drizzle-orm'

import { db } from '@/db/dbClient'
import { Transaction, transactions } from '@/db/schema/transactions'

export const getTransactionsByAccountId = async (accountId: string): Promise<Transaction[]> => {
  return db.select().from(transactions).where(eq(transactions.accountId, accountId))
}

export const getTransactionById = async (
  transactionId: string
): Promise<Transaction | undefined> => {
  const result = await db
    .select()
    .from(transactions)
    .where(eq(transactions.transactionId, transactionId))
  return result[0]
}

export const createTransaction = async (
  transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Transaction> => {
  const result = await db.insert(transactions).values(transactionData).returning()
  return result[0]
}
