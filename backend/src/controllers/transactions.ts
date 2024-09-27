import { Request, Response } from 'express'

import * as transactionService from '@/services/transactions'

export const getTransactionsByAccountId = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params
    const transactions = await transactionService.getTransactionsByAccountId(accountId)
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
}

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params
    const transaction = await transactionService.getTransactionById(transactionId)
    if (transaction) {
      res.status(200).json(transaction)
    } else {
      res.status(404).json({ error: 'Transaction not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' })
  }
}
