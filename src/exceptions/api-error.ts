export const enum StatusCodeEnum {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

class ApiError extends Error {
  status: number
  errors: Error[]

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  static unauthorizedError(): ApiError {
    return new ApiError(StatusCodeEnum.UNAUTHORIZED, 'Unauthorized')
  }

  static badRequest(message: string): ApiError {
    return new ApiError(StatusCodeEnum.BAD_REQUEST, message)
  }
}

export default ApiError
