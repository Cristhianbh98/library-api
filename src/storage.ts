import config from './config'
import { Filestack, ClientOptions } from 'filestack-js'

const options: ClientOptions = {
  security: {
    policy: config.FILESTACK_POLICY,
    signature: config.FILESTACK_SIGNATURE
  }
}

export default Filestack(config.FILESTACK_KEY, options)
