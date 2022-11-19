import { IUser } from '../models/user.model'

export class UserDto {
  _id: string
  email: string

  constructor(data: IUser) {
    this._id = data._id
    this.email = data.email
  }
}
