import session from 'express-session'
import { createClient } from 'redis'
import RedisStore from 'connect-redis'

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

redisClient.connect().catch((error: Error) => console.error(error))

const redisStore = new RedisStore({
  client: redisClient,
})

const sessionMiddleware = session({
  name: 'qid',
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
})

export default sessionMiddleware
