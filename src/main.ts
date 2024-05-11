import fastify, { FastifyServerOptions } from 'fastify'
import closeWithGrace from 'close-with-grace'
import authRouter from './modules/auth/auth.router'

const opts: FastifyServerOptions = { logger: true }
if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: 'pino-pretty',
    },
  }
}
const app = fastify(opts)

app.register(authRouter, { prefix: '/api/auth' })

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
