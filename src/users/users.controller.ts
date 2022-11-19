import { NextFunction, Request, Response } from 'express'
import { IUser } from './models/user.model'
import usersService from './users.service'



class UsersController {
  async me(req: Request<never, never, IUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      const {body} = req

      const user = await usersService.createUser(body)
      await res.json(user)
      next()
    } catch (e) {

    }
  }
}

export default new UsersController()
