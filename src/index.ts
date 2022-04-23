import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function init () {
  /* Start database */
  await mongoose.connect(config.MONGO_DB_URI)
  console.log('  Mongodb connected correctly!')

  /* Start express */
  app.listen(app.get('port'), () => {
    const port = app.get('port')
    const env = app.get('env')
    console.log(`  App is running at http://localhost:${port} in ${env} mode`)
    console.log('  Press CTRL-C to stop\n')
  })
}

init()
