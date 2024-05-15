import fastify, { FastifyServerOptions } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import closeWithGrace from 'close-with-grace'
import Redis from 'ioredis'
import RedisStore from 'connect-redis'
import authRouter from './modules/auth/auth.router'

const redisClient = new Redis(process.env.REDIS_URL)
const redisStore = new RedisStore({ client: redisClient })

const opts: FastifyServerOptions = { logger: true }
if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: 'pino-pretty',
    },
  }
}
const app = fastify(opts)
app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
})
app.register(fastifyCookie)
app.register(fastifySession, {
  secret: process.env.COOKIE_SECRET,
  store: redisStore,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.COOKIE_TTL),
    secure: false,
    sameSite: 'lax',
  },
})
app.register(authRouter, { prefix: '/api/auth' })

app.setErrorHandler(async (err, _, reply) => {
  return reply.status(err.statusCode || 500).send({
    success: false,
    error: err,
  })
})

const host = process.env.HOST
const port = parseInt(process.env.PORT)
app.listen({ host, port }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

closeWithGrace({ delay: 200 }, async ({ signal, err }) => {
  if (err) {
    app.log.error({ err }, 'Server closing with error')
  } else {
    app.log.info(`${signal} recieved, server closing`)
  }
  await app.close()
})
