import { Router } from 'express'
import { getTransactionById } from '@/controllers/transactions'

const router: Router = Router()

router.get('/:transactionId', getTransactionById)

export default router
