import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import sg from '../../utils/sendgrid'
import { LoginRequest, RegisterRequest, VerifyRequest } from './auth.schema'
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
} from './auth.service'
import userService from '../user/user.service'

export const register = async (
  req: Request<{}, {}, RegisterRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await createUser(name, email, passwordHash)

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: '30m',
      }
    )

    await sg.send({
      to: email,
      from: process.env.EMAIL_SENDER,
      subject: 'Verify your e-mail for this Authentication App',
      html: `<h2>Hello ${name},</h2> 
      <p>Thank your for signing up to this authentication app.</p>
      <p>Please verify your email address by clicking <a href="http://localhost:3000/api/auth/verify/${token}">this link</a>.</p>`,
    })

    return res.status(200).send({
      success: true,
      message: 'User sucessfully created.',
    })
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

    const user = await userService.findOneByEmail(email)

    if (!user) {
      return res.status(401).send({
        success: false,
        error: {
          status: 'unauthorized_error',
          message: 'Invalid email or password.',
        },
      })
    }

    if (user.oauthProvider) {
      return res.status(401).send({
        success: false,
        error: {
          status: 'unauthorized_error',
          message: `Log in with your ${user.oauthProvider} account`,
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

    if (!user.isVerified) {
      return res.status(403).send({
        success: false,
        error: {
          status: 'not_verified',
          message: 'User is not verified',
        },
      })
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    req.session.user = sessionUser

    return res.status(200).send({
      success: true,
      user: sessionUser,
    })
  } catch (error) {
    next(error)
  }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user

    return res.status(200).send({
      success: true,
      user,
    })
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
    return res.status(200).clearCookie('sid').send({
      success: true,
      message: 'Logged out successfully.',
    })
  })
}

interface VerificationPayload extends JwtPayload {
  id: string
}

export const verify = async (
  req: Request<VerifyRequest['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params

    const { id } = jwt.verify(
      token,
      process.env.EMAIL_SECRET
    ) as VerificationPayload

    await updateUserById(id, { isVerified: true })

    return res.status(200).send({
      success: true,
      message: 'User successfully verified.',
    })
  } catch (error) {
    next(error)
  }
}
