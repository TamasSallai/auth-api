import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          success: false,
          errors: error.errors,
        })
      }
      next(error)
    }
  }

export default validateRequest
