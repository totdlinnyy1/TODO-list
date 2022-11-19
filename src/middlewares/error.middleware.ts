import { NextFunction, Request, Response } from 'express'

import ApiError from '../exceptions/api-error'
import { StatusCodeEnum } from '../status-code.enum'

const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors })
    next()
  }
  res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
  next()
}

export default errorMiddleware
