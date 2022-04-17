import { Router } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

router.get('/', userController.index)
router.get('/:id', userController.show)

router.post('/', userController.store)
router.post('/login', userController.login)

router.put('/:id', userController.update)

router.delete('/:id', userController.destroy)

export default router
