import { Router } from 'express'
import bookController from '../controllers/book.controller'

const router = Router()

router.get('/', bookController.index)
router.get('/:id', bookController.show)

router.post('/', bookController.store)

router.put('/:id', bookController.update)

router.delete('/:id', bookController.destroy)

export default router
