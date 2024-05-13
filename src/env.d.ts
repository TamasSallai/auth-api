import { SessionUser } from './types'
import { FastifySessionObject } from '@fastify/session'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      HOST: string
      REDIS_URL: string
      DATABASE_URL: string
      COOKIE_SECRET: string
      COOKIE_TTL: string
    }
  }
}

declare module '@fastify/session' {
  interface FastifySessionObject {
    user?: SessionUser
  }
}

export {}
