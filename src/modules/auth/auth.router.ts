import bcrypt from 'bcrypt'
import { FastifyPluginAsync } from 'fastify'
import { createUser, findUserByEmail } from './auth.service'
import {
  LoginBodyType,
  RegisterBodyType,
  loginBodySchema,
  registerBodySchema,
} from './auth.schema'
import { ConflictError, UnauthorizedError } from '../../utils/customErrors'

const authRouter: FastifyPluginAsync = async (app) => {
  app.post<{ Body: RegisterBodyType }>(
    '/register',
    { schema: { body: registerBodySchema } },
    async (req, reply) => {
      const data = req.body

      const user = await findUserByEmail(data.email)

      if (user) {
        throw new ConflictError('User with email already exists')
      }

      await createUser(data)

      return reply.status(201).send({
        success: true,
        message: 'user created',
      })
    }
  )

  app.post<{ Body: LoginBodyType }>(
    '/login',
    { schema: { body: loginBodySchema } },
    async (req, reply) => {
      const { email, password } = req.body

      const user = await findUserByEmail(email)
      if (!user) {
        throw new UnauthorizedError('Invalid email or password')
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password)
      if (!isCorrectPassword) {
        throw new UnauthorizedError('Invalid email or password')
      }

      req.session.user = {
        id: user.id,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      }

      return reply.status(200).send({
        success: true,
        message: 'user logged in',
      })
    }
  )

  app.get('/profile', async (req, reply) => {
    const user = req.session.user

    if (!user) {
      throw new UnauthorizedError('Invalid user session')
    }

    return reply.send({
      success: true,
      user,
    })
  })

  app.get('/logout', async (req, reply) => {
    await req.session.destroy()

    return reply.send({
      success: true,
      message: 'user logged out',
    })
  })
}

export default authRouter
