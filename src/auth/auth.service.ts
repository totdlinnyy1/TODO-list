import { compare } from 'bcrypt'

import ApiError from '../exceptions/api-error'
import { IUser } from '../users/models/user.model'
import UsersService from '../users/users.service'

class AuthService {
  async validateUser(data: IUser): Promise<IUser> {
    const user = await UsersService.findUserByEmail(data.email)

    if (!user) {
      throw ApiError.badRequest('Такого пользователя не существует')
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      throw ApiError.badRequest('Такого пользователя не существует')
    }

    return user
  }
}

export default new AuthService()
