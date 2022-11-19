import { ValidationError } from 'express-validator'

import { StatusCodeEnum } from '../status-code.enum'

class ApiError extends Error {
  status: number
  errors: Error[] | ValidationError[]

  constructor(
    status: number,
    message: string,
    errors: Error[] | ValidationError[] = []
  ) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static unauthorizedError(): ApiError {
    return new ApiError(StatusCodeEnum.UNAUTHORIZED, 'Unauthorized')
  }

  static badRequest(message: string, errors: ValidationError[] = []): ApiError {
    return new ApiError(StatusCodeEnum.BAD_REQUEST, message, errors)
  }
}

export default ApiError
