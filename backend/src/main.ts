import 'dotenv/config'
import express from 'express'
import pinoHTTP from 'pino-http'
import cors from 'cors'

import accountRoutes from '@/routes/accounts'
import transactionRoutes from '@/routes/transactions'
import billSplitRoutes from '@/routes/billSplits'
import userRoutes from '@/routes/users'
import { errorHandler } from '@/utils/errorHandler'
import logger from '@/services/logger'

const app = express()
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: true, // !Allows any origin
    credentials: true
  })
)
app.use(express.json())
app.use(
  pinoHTTP({
    logger
  })
)

app.use('/v1/users', userRoutes)
app.use('/v1/accounts', accountRoutes)
app.use('/v1/transactions', transactionRoutes)
app.use('/v1/split-bill', billSplitRoutes)

app.use('*', (req, _, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as Error & { statusCode: number }
  err.statusCode = 404
  next(err)
})

app.use('/', (_, res) => {
  res.status(200).json({
    message: 'Welcome to Splitly!❤️',
    description: 'A platform to easily split bills with friends.',
    version: '1.0.0'
  })
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
