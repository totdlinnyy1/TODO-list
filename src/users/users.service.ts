import * as bcrypt from 'bcrypt'
import UserModel, { IUser } from './models/user.model'
import ApiError from '../exceptions/api-error'

class UsersService {
  async createUser(data: IUser): Promise<IUser> {
    const candidate = await UserModel.findOne({email: data.email})
    if (candidate) {
      throw ApiError.badRequest('Такой пользователь уже существует')
    }
    const salt = 10
    const hashedPassword = await bcrypt.hash(data.password, salt)

    return await UserModel.create({email: data.email, password: hashedPassword})
  }

  async findUserByEmail(email: string): Promise<IUser | null | undefined> {
    return await UserModel.findOne({ email })
  }
}

export default new UsersService()
