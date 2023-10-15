import { NextFunction, Request, Response } from 'express'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session)

  if (!req.session.userId) {
    return res.status(401).send({
      status: false,
      message: 'Unauthorized',
    })
  }

  return next()
}

export default isAuth
