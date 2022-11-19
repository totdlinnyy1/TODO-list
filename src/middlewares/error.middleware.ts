import { NextFunction, Request, Response } from 'express'

import ApiError, { StatusCodeEnum } from '../exceptions/api-error'

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
