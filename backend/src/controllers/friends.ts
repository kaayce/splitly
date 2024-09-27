import { Request, Response } from 'express'

import * as friendService from '@/services/friends'

export const getFriendsDetail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const friends = await friendService.getFriendsByUserId(userId)
    res.status(200).json(friends)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends list' })
  }
}
