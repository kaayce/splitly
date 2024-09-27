import { Router } from 'express'
import { getUserAccounts } from '@/controllers/accounts'
import { getTransactionsByAccountId } from '@/controllers/transactions'

const router: Router = Router({ mergeParams: true })

router.get('/', getUserAccounts)
router.get('/:accountId/transactions', getTransactionsByAccountId)

export default router
