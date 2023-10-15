import 'dotenv/config.js'
import cors from 'cors'
import express from 'express'
import session from './middlewares/session'
import authRouter from './modules/auth/auth.router'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.json())
app.use(session)
app.use('/api/auth', authRouter)

const port = process.env.PORT
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
)
