import { Router } from 'express'
import { body } from 'express-validator'

import authController from './auth.controller'

export const authRouter = Router()

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 16 }),
  authController.signUp
)
authRouter.post('/signin', authController.signIn)
