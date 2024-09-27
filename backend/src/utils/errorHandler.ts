import { Request, Response } from 'express'
import logger from '@/services/logger'

export const errorHandler = (err: Error, req: Request, res: Response) => {
  logger.error({
    error: err,
    message: err.message || 'Internal Server Error',
    request: {
      method: req.method,
      url: req.url
    }
  })

  let statusCode = 500
  if ('statusCode' in err) {
    statusCode = (err as { statusCode: number }).statusCode
  }

  res.status(statusCode).json({
    error: {
      message: err.message || 'Something went wrong'
    }
  })
}
