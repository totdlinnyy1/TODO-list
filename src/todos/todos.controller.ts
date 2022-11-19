import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import ApiError from '../exceptions/api-error'
import { StatusCodeEnum } from '../status-code.enum'
import { RequestWithUser } from '../types'

import { CompleteTodoDto } from './dtos/complete-todo.dto'
import { CreateTodoDto } from './dtos/create-todo.dto'
import { DeleteTodoDto } from './dtos/delete-todo.dto'
import { FindTodoDto } from './dtos/find-todo.dto'
import TodosService from './todos.service'

class TodosController {
  // POST: Create todos
  async createTodo(
    req: Request<never, never, CreateTodoDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const userId = (req as unknown as RequestWithUser).user._id
      const { body } = req
      const todo = await TodosService.createTodo({ ...body, userId })
      await res.status(StatusCodeEnum.CREATED).json(todo)
      next()
    } catch (e) {
      next(e)
    }
  }

  // PUT: Complete todos
  async completeTodo(
    req: Request<never, never, CompleteTodoDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const userId = (req as unknown as RequestWithUser).user._id
      const { body } = req
      const todo = await TodosService.completeTodo({ ...body, userId })
      await res.json(todo)
      next()
    } catch (e) {
      next(e)
    }
  }

  // DELETE: Delete todos
  async deleteTodo(
    req: Request<never, never, DeleteTodoDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const userId = (req as unknown as RequestWithUser).user._id
      const { body } = req
      const result = await TodosService.deleteTodo({ ...body, userId })
      await res.status(StatusCodeEnum.DELETED).json(result)
      next()
    } catch (e) {
      next(e)
    }
  }

  // GET: Get todos
  async getToDos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const userId = (req as RequestWithUser).user._id
      const searchQuery = req.query
      searchQuery.userId = userId
      const todos = await TodosService.findTodos(
        searchQuery as unknown as FindTodoDto
      )
      await res.json(todos)
      next()
    } catch (e) {
      next(e)
    }
  }
}

export default new TodosController()
