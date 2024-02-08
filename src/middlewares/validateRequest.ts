import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest =
  (schema: AnyZodObject) => (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      })
      return next()
    } catch (error) {
      return next(error)
    }
  }

export default validateRequest
