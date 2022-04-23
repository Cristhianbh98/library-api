import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import config from './config'

import router from './routes'

// Create Express server
const app = express()

// Express configuration
app.set('port', config.PORT)
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use(router)

export default app
