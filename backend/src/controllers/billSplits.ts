import { Request, Response } from 'express'

import * as billSplitService from '@/services/billSplits'
import * as billParticipantsService from '@/services/billParticipants'
import * as accountService from '@/services/accounts'

export const createBillSplit = async (req: Request, res: Response) => {
  try {
    const { transactionId, payerId, users, totalAmount } = req.body

    if (!transactionId || !payerId || !Array.isArray(users) || totalAmount <= 0) {
      return res.status(400).json({ error: 'Invalid input data' })
    }

    const billSplit = await billSplitService.createBillSplit({
      transactionId,
      payerId,
      totalAmount
    })

    console.log('Created bill split', billSplit)

    await billParticipantsService.createBillParticipants(billSplit.splitId, payerId, users)

    for (const user of users) {
      const amountOwed = user.amountOwed
      const userId = user.userId

      if (userId !== payerId) {
        await accountService.deductAmount(userId, amountOwed)
      } else {
        await accountService.addAmount(payerId, amountOwed)
      }
    }

    res.status(201).json(billSplit)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bill split', see: error })
  }
}
