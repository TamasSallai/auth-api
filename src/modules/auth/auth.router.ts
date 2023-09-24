import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { loginHandler, registerHandler } from './auth.controller'
import { loginRequestSchema, registerRequestSchema } from './auth.schema'

const router = express.Router()

router.post('/login', validateRequest(loginRequestSchema), loginHandler)

router.post(
  '/register',
  validateRequest(registerRequestSchema),
  registerHandler
)

export default router
