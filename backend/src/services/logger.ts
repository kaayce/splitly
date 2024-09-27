import pino from 'pino'
import { Logger } from 'drizzle-orm/logger'

const logger = pino({
  name: 'splitly-app',
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true
    }
  }
})

export class DBLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params })
  }
}

export default logger
