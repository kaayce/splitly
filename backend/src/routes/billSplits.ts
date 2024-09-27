import { Router } from 'express'
import { createBillSplit } from '@/controllers/billSplits'

const router: Router = Router()

router.post('/request-payment', createBillSplit)

export default router
