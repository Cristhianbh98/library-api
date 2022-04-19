import { Router } from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware'
import getUserMiddleware from '../middlewares/getUser.middleware'

const router = Router()

router.get('/', getUserMiddleware, userController.index)
router.get('/:id', getUserMiddleware, userController.show)

router.post('/', userController.store)
router.post('/login', userController.login)
router.post('/verifyToken', userController.verifyToken)
router.post('/emailExists', userController.emailExists)
router.post('/usernameExists', userController.usernameExists)

router.put('/:id', authMiddleware, userController.update)

router.delete('/:id', userController.destroy)

export default router
