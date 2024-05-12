import fastify, { FastifyServerOptions } from 'fastify'
import closeWithGrace from 'close-with-grace'
import authRouter from './modules/auth/auth.router'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'

const opts: FastifyServerOptions = { logger: true }
if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: 'pino-pretty',
    },
  }
}
const app = fastify(opts)
app.register(fastifyCookie)
app.register(fastifySession, {
  secret:
    process.env.COOKIE_SECRET ||
    'a secret with minimum length of 32 characters',
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.COOKE_MAX_AGE || '86400'), // 24 hour is seconds
    sameSite: 'lax',
    secure: false,
  },
})
app.register(authRouter, { prefix: '/api/auth' })

app.setErrorHandler(async (err, _, reply) => {
  return reply.status(err.statusCode || 500).send({
    success: false,
    error: err,
  })
})

const host = process.env.HOST || 'localhost'
const port = parseInt(process.env.PORT || '3000')
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
