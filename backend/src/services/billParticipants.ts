import { eq } from 'drizzle-orm'

import { db } from '@/db/dbClient'
import { BillParticipant, billParticipants } from '@/db/schema/billParticipants'

/* Adds individual participants to a bill split.
 * records each user's share of the bill, including the amount they owe and their payment status.
 */
export const createBillParticipants = async (
  splitId: string,
  payerId: string,
  users: { userId: string; amountOwed: number }[]
): Promise<BillParticipant[]> => {
  return db.transaction(async (tx) => {
    const participants = users.map(({ userId, amountOwed }) => ({
      splitId,
      userId,
      amountOwed,
      paymentStatus: userId === payerId ? ('paid' as const) : ('pending' as const)
    }))

    const result = await tx.insert(billParticipants).values(participants).returning()
    return result
  })
}

export const getBillParticipantsByUserId = async (userId: string): Promise<BillParticipant[]> => {
  return db.select().from(billParticipants).where(eq(billParticipants.userId, userId))
}
