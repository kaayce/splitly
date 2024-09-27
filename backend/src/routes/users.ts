import { Router } from 'express'

import { getUser, getAllUsers } from '@/controllers/users'
import accountRoutes from '@/routes/accounts'
import { getFriendsDetail } from '@/controllers/friends'

const router: Router = Router()

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.get('/:userId/friends', getFriendsDetail)

router.use('/:userId/accounts', accountRoutes)

export default router
