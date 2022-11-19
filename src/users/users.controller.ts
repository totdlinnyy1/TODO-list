import { NextFunction, Request, Response } from 'express'
import { IUser } from './models/user.model'


class UsersController {
  async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = (req as Request & {user: IUser}).user
      await res.json(user)
      next()
    } catch (e) {
      next(e)
    }
  }
}

export default new UsersController()
