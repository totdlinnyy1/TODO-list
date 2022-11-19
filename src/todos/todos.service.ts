import ApiError from '../exceptions/api-error'

import { CompleteTodoDto } from './dtos/complete-todo.dto'
import { CreateTodoDto } from './dtos/create-todo.dto'
import { DeleteTodoDto } from './dtos/delete-todo.dto'
import { FindTodoDto } from './dtos/find-todo.dto'
import TodoModel, { IToDo } from './models/todo.model'

class TodosService {
  async createTodo(data: CreateTodoDto): Promise<IToDo> {
    return await TodoModel.create({ name: data.name, owner: data.userId })
  }

  async deleteTodo(data: DeleteTodoDto): Promise<boolean> {
    const todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      throw ApiError.badRequest('Такой задачи не существует')
    }

    await TodoModel.deleteOne({ _id: data.todoId })

    return true
  }

  async completeTodo(data: CompleteTodoDto): Promise<IToDo> {
    let todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      throw ApiError.badRequest('Такой задачи не существует')
    }

    if (todo.completed) {
      throw ApiError.badRequest('Задача уже выполнена')
    }

    await TodoModel.updateOne({ _id: data.todoId }, { completed: true })

    todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      throw ApiError.badRequest('Такой задачи не существует')
    }

    return todo
  }

  async findTodoById(_id: string): Promise<IToDo | null | undefined> {
    return await TodoModel.findOne({ _id })
  }

  async findTodos(data: FindTodoDto): Promise<IToDo[]> {
    if (!data.completed) {
      data.completed = false
    }
    return await TodoModel.find(
      { owner: data.userId, completed: data.completed },
      null,
      { limit: data.limit, skip: data.skip, sort: { 'created_at': data.sort } }
    )
  }
}

export default new TodosService()
