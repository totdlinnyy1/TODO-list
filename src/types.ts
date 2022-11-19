import { Request } from 'express'

import { UserDto } from './users/dtos/user.dto'

export type RequestWithUser = Request & { user: UserDto }
