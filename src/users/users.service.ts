import * as bcrypt from 'bcrypt'

import ApiError from '../exceptions/api-error'

import UserModel, { IUser } from './models/user.model'

class UsersService {
  async createUser(data: IUser): Promise<IUser> {
    const candidate = await UserModel.findOne({ email: data.email })
    if (candidate) {
      throw ApiError.badRequest('Такой пользователь уже существует')
    }
    const salt = 10
    const hashedPassword = await bcrypt.hash(data.password, salt)

    return await UserModel.create({
      email: data.email,
      password: hashedPassword
    })
  }

  async findUserByEmail(email: string): Promise<IUser | null | undefined> {
    return await UserModel.findOne({ email })
  }

  async findUserById(_id: string): Promise<IUser | null | undefined> {
    return await UserModel.findOne({ _id })
  }
}

export default new UsersService()
