import { Router } from 'express'
import { body, query } from 'express-validator'

import authMiddleware from '../middlewares/auth.middleware'

import todosController from './todos.controller'

export const todosRouter = Router()

todosRouter.post(
  '/create',
  authMiddleware,
  body('name').isLength({ min: 1, max: 300 }).isString(),
  todosController.createTodo
)
todosRouter.put(
  '/complete',
  authMiddleware,
  body('todoId').isString(),
  todosController.completeTodo
)
todosRouter.delete(
  '/delete',
  authMiddleware,
  body('todoId').isString(),
  todosController.deleteTodo
)
todosRouter.get(
  '/',
  authMiddleware,
  query('limit').isInt().optional({ nullable: true }),
  query('skip').isInt().optional({ nullable: true }),
  query('completed').isBoolean().optional({ nullable: true }),
  query('sort')
    .matches(/asc|desc/)
    .optional({ nullable: true }),
  todosController.getToDos
)
