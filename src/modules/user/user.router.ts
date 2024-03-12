import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {
  createHandler,
  findAllHandler,
  findOneByIdHandler,
  removeHandler,
  updateHandler,
} from './user.controller'
import { createUserRequestSchema, updateUserRequestSchema } from './user.schema'

const router = express.Router()

router.post('/', validateRequest(createUserRequestSchema), createHandler)

router.get('/', findAllHandler)

router.get('/:id', findOneByIdHandler)

router.put('/:id', validateRequest(updateUserRequestSchema), updateHandler)

router.delete('/:id', removeHandler)

export default router
