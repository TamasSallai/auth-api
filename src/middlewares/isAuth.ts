import { NextFunction, Request, Response } from 'express'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).send({
      status: false,
      error: {
        type: 'unauthorized_error',
        message: 'No valid session cookie provided.',
      },
    })
  }

  return next()
}

export default isAuth
