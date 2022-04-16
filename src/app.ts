import express from 'express'
import path from 'path'

import router from './routes'

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use(router)

export default app
