import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { LoginRequest, RegisterRequest } from './auth.schema'
import { createUser, findUserByEmail, findUserById } from './auth.service'

export const register = async (
  req: Request<{}, {}, RegisterRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await createUser(name, email, passwordHash)

    req.session.userId = user.id

    return res.status(200).send({ success: true, user })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request<{}, {}, LoginRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).send({
        success: false,
        error: {
          status: 'unauthorized_error',
          message: 'Invalid email or password.',
        },
      })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      return res.status(401).send({
        success: false,
        error: {
          status: 'unauthorized_error',
          message: 'Invalid email or password.',
        },
      })
    }

    req.session.userId = user.id

    return res.status(200).send({ success: true, user })
  } catch (error) {
    next(error)
  }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as string

    const user = await findUserById(userId)

    return res.status(200).send({ success: true, user })
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((error) => {
    if (error) {
      next(error)
    }
    res.clearCookie('sid')
    return res
      .status(200)
      .send({ success: true, message: 'Logged out successfully.' })
  })
}
