import { Router } from 'express'
import bookController from '../controllers/book.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

router.get('/', bookController.index)
router.get('/:id', bookController.show)

router.post('/', authMiddleware, bookController.store)

router.put('/:id', authMiddleware, bookController.update)

router.delete('/:id', authMiddleware, bookController.destroy)

export default router
