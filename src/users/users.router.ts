import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import usersController from './users.controller'

export const usersRouter = Router()

usersRouter.get('/me', authMiddleware, usersController.me)
