import express from 'express'

// Middleware
import errorMiddleware from '../middleware/error.middleware'
import notFound from '../middleware/404.middleware'

// Import Routes
import userRoutes from './user.routes'

const router = express.Router()
const apiRoutes = express.Router()

// load the api routes
apiRoutes.use('/user', userRoutes)

// load main route
router.use('/api/v1', apiRoutes)

// last middlware
router.use(errorMiddleware)
router.use(notFound)

export default router
