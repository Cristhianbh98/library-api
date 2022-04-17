import 'dotenv/config'

export default {
  MONGO_DB_URI: process.env.MONGO_DB_URI || '',
  PORT: process.env.PORT || 3000,
  PASSWORD_TO_CREATE_ADMIN: process.env.PASSWORD_TO_CREATE_ADMIN || false,
  JWT_KEY: process.env.JWT_KEY
}
