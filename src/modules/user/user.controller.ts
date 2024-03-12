import { NextFunction, Request, Response } from 'express'
import userService from './user.service'
import { CreateUserRequest, UpdateUserRequest } from './user.schema'

export const createHandler = async (
  req: Request<{}, {}, CreateUserRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const user = await userService.create(data)
    return res.status(201).send({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

export const findAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.findAll()
    return res.status(200).send({
      success: true,
      users,
    })
  } catch (error) {
    next(error)
  }
}

export const findOneByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.findOneById(req.params.id)
    return res.status(200).send({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

export const updateHandler = (
  req: Request<UpdateUserRequest['params'], {}, UpdateUserRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const data = req.body
    const user = userService.update(id, data)
    return res.status(203).send({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

export const removeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const user = userService.remove(id)
    return res.status(204).send({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}
