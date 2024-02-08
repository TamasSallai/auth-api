import express from 'express'
import isAuth from '../../middlewares/isAuth'
import validateRequest from '../../middlewares/validateRequest'
import { loginRequestSchema, registerRequestSchema } from './auth.schema'
import { login, logout, me, register } from './auth.controller'

const router = express.Router()

router.post('/register', validateRequest(registerRequestSchema), register)

router.post('/login', validateRequest(loginRequestSchema), login)

router.get('/me', isAuth, me)

router.get('/logout', logout)

export default router
