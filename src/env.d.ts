import { SessionUser } from './types'
import { FastifySessionObject } from '@fastify/session'

declare module '@fastify/session' {
  interface FastifySessionObject {
    user?: SessionUser
  }
}

export default {}
