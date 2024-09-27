import { Request, Response } from 'express'

import * as userService from '@/services/users'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const user = await userService.getUserById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user info' })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get any users' })
  }
}
