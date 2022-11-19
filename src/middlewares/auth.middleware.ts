import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error'
import tokenService from '../auth/token.service'
import usersService from '../users/users.service'
import { IUser } from '../users/models/user.model'

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorizedError())
    }

    const token = authorizationHeader.split(' ')[1]
    if (!token) {
      return next(ApiError.unauthorizedError())
    }

    const id = tokenService.validateToken(token)
    if (!id) {
      return next(ApiError.unauthorizedError())
    }

    const user = await usersService.findUserById(id)
    if (!user) {
      return next(ApiError.unauthorizedError())
    }

    (req as Request & {user: IUser}).user  = user
    next()
  } catch (e) {
    return next(ApiError.unauthorizedError())
  }
}

export default authMiddleware
