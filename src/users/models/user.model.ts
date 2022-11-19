import { model, Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
