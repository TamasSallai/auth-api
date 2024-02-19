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

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    req.session.user = sessionUser

    return res.status(200).send({ success: true, user: sessionUser })
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

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    req.session.user = sessionUser

    return res.status(200).send({ success: true, user: sessionUser })
  } catch (error) {
    next(error)
  }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user

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
    return res
      .status(200)
      .clearCookie('sid')
      .send({ success: true, message: 'Logged out successfully.' })
  })
}
