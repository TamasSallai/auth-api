import session from 'express-session'
import { createClient } from 'redis'
import RedisStore from 'connect-redis'

const REDIS_URI = process.env.REDIS_URI || 'redis'
const REDIS_PORT = process.env.REDIS_PORT || 6379
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'

const redisClient = createClient({
  url: `redis://${REDIS_URI}:${REDIS_PORT}`,
})

redisClient.connect().catch((error: Error) => console.error(error))

const redisStore = new RedisStore({
  client: redisClient,
})

const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
})

export default sessionMiddleware
