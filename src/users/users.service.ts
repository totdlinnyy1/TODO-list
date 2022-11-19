import * as bcrypt from 'bcrypt'

import ApiError from '../exceptions/api-error'

import UserModel, { IUser } from './models/user.model'

class UsersService {

  // Create user function
  async createUser(data: IUser): Promise<IUser> {
    console.log('Start user creating: ', data.email)
    const candidate = await UserModel.findOne({ email: data.email })
    if (candidate) {
      console.warn('Such user is already exist error')
      throw ApiError.badRequest('Такой пользователь уже существует')
    }

    const salt = 10
    const hashedPassword = await bcrypt.hash(data.password, salt)

    console.log('Save user to database')
    return await UserModel.create({
      email: data.email,
      password: hashedPassword
    })
  }

  // Finding user by Email
  async findUserByEmail(email: string): Promise<IUser | null | undefined> {
    console.log('Start finding user by email: ', email)
    return await UserModel.findOne({ email })
  }

  // Finding user by id
  async findUserById(_id: string): Promise<IUser | null | undefined> {
    console.log('Start finding user by id: ', _id)
    return await UserModel.findOne({ _id })
  }
}

export default new UsersService()
