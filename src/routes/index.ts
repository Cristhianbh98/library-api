import express from 'express'

// Middleware
import errorMiddleware from '../middlewares/error.middleware'
import notFound from '../middlewares/404.middleware'
import loggerMiddleware from '../middlewares/logger.middleware'

// Import Routes
import userRoutes from './user.routes'

const router = express.Router()
const apiRoutes = express.Router()

// first middleware
router.use(loggerMiddleware)

// load the api routes
apiRoutes.use('/user', userRoutes)

// load main route
router.use('/api/v1', apiRoutes)

// last middlware
router.use(errorMiddleware)
router.use(notFound)

export default router
