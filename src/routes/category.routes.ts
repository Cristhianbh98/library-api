import { Router } from 'express'
import categoryController from '../controllers/category.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

router.get('/', categoryController.index)
router.get('/:id', categoryController.show)

router.post('/', authMiddleware, categoryController.store)

router.put('/:id', authMiddleware, categoryController.update)

router.delete('/:id', authMiddleware, categoryController.destroy)

export default router
