import { NextFunction, Request, Response } from 'express'

import { RequestWithUser } from '../types'

class UsersController {
  // GET: get user data
  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as RequestWithUser).user
      await res.json(user)
      next()
    } catch (e) {
      next(e)
    }
  }
}

export default new UsersController()
