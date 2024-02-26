import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const fields = error.meta?.target as String[]
      return res.status(400).send({
        success: false,
        error: {
          type: 'unique_contraint_error',
          message: `Unique constraint violation. Record with ${fields} already exists.`,
          details: fields,
        },
      })
    }
  }

  if (error instanceof ZodError) {
    return res.status(400).send({
      success: false,
      error: {
        type: 'validation_error',
        message: 'Request validation failed.',
        details: error.errors,
      },
    })
  }

  console.log(error)
  return res.status(500).send({
    success: false,
    error: {
      type: 'internal_server_error',
      message: 'Something went wrong.',
    },
  })
}

export default errorHandler
