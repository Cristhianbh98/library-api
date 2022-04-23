import config from './config'
import { Filestack } from 'filestack-js'

export default Filestack(config.FILESTACK_KEY)
