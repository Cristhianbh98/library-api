import app from './app'
import mongoose from 'mongoose'
import config from './config'

/**
 * Start Express server.
 */

const startServer = () => {
  app.listen(app.get('port'), () => {
    const port = app.get('port')
    const env = app.get('env')
    console.log(`  App is running at http://localhost:${port} in ${env} mode`)
    console.log('  Press CTRL-C to stop\n')
  })
}

mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    console.log('  Mongodb connected correctly!')
    startServer()
  })
  .catch(e => console.log(e))
