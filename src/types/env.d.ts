import { FastifySessionObject } from '@fastify/session'
import { SessionUser } from '../types'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      HOST: string
      REDIS_URL: string
      DATABASE_URL: string
      COOKIE_SECRET: string
      COOKIE_TTL: string
      CORS_ORIGIN: string
    }
  }
}

declare module '@fastify/session' {
  interface FastifySessionObject {
    user?: SessionUser
  }
}

export {}
