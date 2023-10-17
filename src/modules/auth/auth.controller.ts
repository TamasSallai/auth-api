import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail, findUserById } from './auth.service'
import { LoginRequest, RegisterRequest } from './auth.schema'

export const login = async (
  req: Request<{}, {}, LoginRequest['body']>,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password',
      })
    }

    req.session.userId = user.id

    return res.status(200).send({
      success: true,
      data: { user },
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    })
  }
}

export const register = async (
  req: Request<{}, {}, RegisterRequest['body']>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, passwordHash)

    req.session.userId = user.id

    return res.status(200).send({
      success: true,
      data: { user },
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    })
  }
}

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId as string

    const user = await findUserById(userId)

    return res.status(200).send({
      success: true,
      data: { user },
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    })
  }
}
