import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import ApiError from '../exceptions/api-error'
import { IUser } from '../users/models/user.model'
import usersService from '../users/users.service'

import authService from './auth.service'
import jwtService from './token.service'

class AuthController {
  async signUp(
    req: Request<never, never, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const { body } = req
      const user = await usersService.createUser(body)
      const token = jwtService.generateToken({ sub: user._id })
      await res.json(token)
      next()
    } catch (e) {
      next(e)
    }
  }

  async signIn(
    req: Request<never, never, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { body } = req
      const user = await authService.validateUser(body)
      const token = jwtService.generateToken({ sub: user._id })
      await res.json(token)
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()
