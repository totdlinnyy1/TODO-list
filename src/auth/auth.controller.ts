import { NextFunction, Request, Response } from 'express'
import { IUser } from '../users/models/user.model'
import usersService from '../users/users.service'
import jwtService from './token.service'
import authService from './auth.service'
import tokenService from './token.service'

class AuthController {
  async signUp(req: Request<never, never, IUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      const {body} = req
      const user = await usersService.createUser(body)
      const token = jwtService.generateToken({sub: user._id})
      await res.json(token)
      next()
    } catch (e) {
      next(e)
    }
  }

  async signIn(req: Request<never, never, IUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      const {body} = req
      const user = await authService.validateUser(body)
      const token = tokenService.generateToken({sub: user._id})
      await res.json(token)
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()
