import { Router } from 'express'
import favoriteController from '../controllers/favorite.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

router.get('/', authMiddleware, favoriteController.list)
router.post('/add', authMiddleware, favoriteController.add)
router.post('/remove', authMiddleware, favoriteController.remove)

export default router
