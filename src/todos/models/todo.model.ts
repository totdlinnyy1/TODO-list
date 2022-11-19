import { model, Schema, Document } from 'mongoose'
import * as mongoose from 'mongoose'

import { IUser } from '../../users/models/user.model'

export interface IToDo extends Document {
  name: string
  completed: boolean
  owner: IUser
}

export const ToDoSchema = new Schema<IToDo>(
  {
    name: {
      type: String,
      required: true,
      min: 1,
      max: 300
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const ToDoModel = model<IToDo>('ToDo', ToDoSchema)

export default ToDoModel
