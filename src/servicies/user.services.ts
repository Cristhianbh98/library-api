import userRepository from '../repositories/user.repository'
import { compareSync } from 'bcryptjs'
import config from '../config'
import jwt from 'jsonwebtoken'

async function store (user: object) {
  return await userRepository.store(user)
}

async function login (email: string, password: string) {
  const user = await userRepository.findByEmail(email)

  if (!compareSync(password, <string>user?.password)) {
    throw new Error('The password or email is not correct')
  }

  const payload = { userId: user?._id, username: user?.username }
  const token = jwt.sign(payload, <string>config.JWT_KEY, { expiresIn: 30 * 24 * 60 * 60 })
  return { user, token }
}

function verifyToken (token: string) {
  return jwt.verify(token, <string>config.JWT_KEY)
}

const userService = {
  store,
  login,
  verifyToken
}

export default userService
