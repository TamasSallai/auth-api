import 'dotenv/config.js'
import cors from 'cors'
import express from 'express'
import session from './middlewares/session'
import authRouter from './modules/auth/auth.router'
import userRouter from './modules/user/user.router'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.json())
app.use(session)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
