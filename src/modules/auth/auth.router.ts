import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { login, register, me } from './auth.controller'
import { loginRequestSchema, registerRequestSchema } from './auth.schema'
import isAuth from '../../middlewares/isAuth'

const router = express.Router()

router.post('/login', validateRequest(loginRequestSchema), login)

router.post('/register', validateRequest(registerRequestSchema), register)

router.get('/me', isAuth, me)

export default router
