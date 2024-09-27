import { Request, Response } from 'express'

import * as accountService from '@/services/accounts'

export const getUserAccounts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const accounts = await accountService.getAccountsByUserId(userId)
    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch accounts' })
  }
}
