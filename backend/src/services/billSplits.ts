import { eq } from 'drizzle-orm'
import { db } from '@/db/dbClient'
import { BillSplit, billSplits, transactions } from '@/db/schema'

/* Creates a bill split record for a given transaction.
 * handles split details, total amount, & the payer
 * links to original transaction
 */

export const createBillSplit = async (data: {
  transactionId: string
  payerId: string
  totalAmount: number
}): Promise<BillSplit> => {
  return db.transaction(async (tx) => {
    const [transactionDetails] = await tx
      .select()
      .from(transactions)
      .where(eq(transactions.transactionId, data.transactionId))

    if (!transactionDetails) {
      throw new Error('Transaction not found')
    }

    const [newBillSplit] = await tx
      .insert(billSplits)
      .values({
        ...data,
        splitDate: new Date()
      })
      .returning()

    return newBillSplit
  })
}

export const getBillSplitsByUserId = async (userId: string): Promise<BillSplit[]> => {
  return db.select().from(billSplits).where(eq(billSplits.payerId, userId))
}
