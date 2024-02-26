import express from 'express'
import isAuth from '../../middlewares/isAuth'
import validateRequest from '../../middlewares/validateRequest'
import {
  loginRequestSchema,
  registerRequestSchema,
  verifyRequestSchema,
} from './auth.schema'
import { login, logout, me, register, verify } from './auth.controller'

const router = express.Router()

router.post('/register', validateRequest(registerRequestSchema), register)

router.post('/login', validateRequest(loginRequestSchema), login)

router.get('/me', isAuth, me)

router.get('/logout', logout)

router.get('/verify/:token', validateRequest(verifyRequestSchema), verify)

export default router
