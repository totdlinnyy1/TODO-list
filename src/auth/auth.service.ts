import { compare } from 'bcrypt'

import ApiError from '../exceptions/api-error'
import { IUser } from '../users/models/user.model'
import UsersService from '../users/users.service'

class AuthService {
  // Validating user login data
  async validateUser(data: IUser): Promise<IUser> {
    console.log('Start validating user: ', data.email)
    const user = await UsersService.findUserByEmail(data.email)

    if (!user) {
      console.warn('Such user doesnt exist error')
      throw ApiError.badRequest('Такого пользователя не существует')
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      console.warn('Such user doesnt exist error')
      throw ApiError.badRequest('Такого пользователя не существует')
    }

    console.log('Return user', user)
    return user
  }
}

export default new AuthService()
