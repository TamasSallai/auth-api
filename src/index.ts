import 'dotenv/config.js'
import express from 'express'
import session from './middlewares/session'
import authRouter from './modules/auth/auth.router'

const app = express()

app.use(express.json())
app.use(session)
app.use('/api/auth', authRouter)

const port = 3000
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
)
