import { NextFunction, Request, Response } from 'express'

import tokenService from '../auth/token.service'
import ApiError from '../exceptions/api-error'
import usersService from '../users/users.service'
import { RequestWithUser } from '../types'
import { UserDto } from '../users/dtos/user.dto'

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

    (req as RequestWithUser).user = new UserDto(user)
    next()
  } catch (e) {
    return next(ApiError.unauthorizedError())
  }
}

export default authMiddleware
