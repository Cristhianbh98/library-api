import 'dotenv/config'
import app from './app'
import mongoose from 'mongoose'

/**
 * Start Express server.
 */

const MONGO_DB_URI = <string> process.env.MONGO_DB_URI

const startServer = () => {
  app.listen(app.get('port'), () => {
    const port = app.get('port')
    const env = app.get('env')
    console.log(`  App is running at http://localhost:${port} in ${env} mode`)
    console.log('  Press CTRL-C to stop\n')
  })
}

mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log('  Mongodb connected correctly!')
    startServer()
  })
  .catch(e => console.log(e))
