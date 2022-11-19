import { Router } from 'express'

import { authRouter } from '../auth/auth.router'
import { todosRouter } from '../todos/todos.router'
import { usersRouter } from '../users/users.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/todos', todosRouter)

export default router
