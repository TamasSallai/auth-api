import { FastifyPluginAsync } from 'fastify'
import {
  LoginBodyType,
  RegisterBodyType,
  loginBodySchema,
  registerBodySchema,
} from './auth.schema'

const authRouter: FastifyPluginAsync = async (app) => {
  app.post<{ Body: RegisterBodyType }>(
    '/register',
    { schema: { body: registerBodySchema } },
    async (req, res) => {
      const { displayName, email, password } = req.body
      return 'user registeres'
    }
  )

  app.post<{ Body: LoginBodyType }>(
    '/login',
    { schema: { body: loginBodySchema } },
    async (req, res) => {
      const { email, password } = req.body
      return 'user logged in'
    }
  )

  app.get('/profile', async (req, res) => {
    return 'user profile'
  })
}

export default authRouter
