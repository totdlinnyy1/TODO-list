import ApiError from '../exceptions/api-error'

import { CompleteTodoDto } from './dtos/complete-todo.dto'
import { CreateTodoDto } from './dtos/create-todo.dto'
import { DeleteTodoDto } from './dtos/delete-todo.dto'
import { FindTodoDto } from './dtos/find-todo.dto'
import TodoModel, { IToDo } from './models/todo.model'

class TodosService {
  // Creating todos
  async createTodo(data: CreateTodoDto): Promise<IToDo> {
    console.log('Start creating todo: ', data)
    console.log('Return todo')
    return await TodoModel.create({ name: data.name, owner: data.userId })
  }

  // Deleting todos
  async deleteTodo(data: DeleteTodoDto): Promise<boolean> {
    console.log('Start deleting todo: ', data)
    const todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      console.warn('Such todo doesnt exist: ', data.todoId)
      throw ApiError.badRequest('Такой задачи не существует')
    }

    await TodoModel.deleteOne({ _id: data.todoId })
    console.log('Return delete result')
    return true
  }

  // Mark todos complete
  async completeTodo(data: CompleteTodoDto): Promise<IToDo> {
    console.log('Start completing todo: ', data)
    let todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      console.warn('Such todo doesnt exist: ', data.todoId)
      throw ApiError.badRequest('Такой задачи не существует')
    }

    if (todo.completed) {
      console.warn('Todo is already completed: ', data.todoId)
      throw ApiError.badRequest('Задача уже выполнена')
    }

    await TodoModel.updateOne({ _id: data.todoId }, { completed: true })

    todo = await this.findTodoById(data.todoId)

    if (!todo || !todo.owner._id.equals(data.userId)) {
      console.warn('Such todo doesnt exist: ', data.todoId)
      throw ApiError.badRequest('Такой задачи не существует')
    }

    console.log('Return todo')
    return todo
  }

  // Finding todos by id
  async findTodoById(_id: string): Promise<IToDo | null | undefined> {
    console.log('Start finding todo by id: ', _id)
    return await TodoModel.findOne({ _id })
  }

  // Find todos with filters
  async findTodos(data: FindTodoDto): Promise<IToDo[]> {
    console.log('Start finding todo with filters: ', data)
    if (!data.completed) {
      console.log('Complited filter is empty, set default value - false')
      data.completed = false
    }

    console.log('Return todos')
    return await TodoModel.find(
      { owner: data.userId, completed: data.completed },
      null,
      { limit: data.limit, skip: data.skip, sort: { created_at: data.sort } }
    )
  }
}

export default new TodosService()
