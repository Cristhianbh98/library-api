import jwt from 'jsonwebtoken'
import config from '../config'
import { compareSync } from 'bcryptjs'
import userRepository from '../repositories/user.repository'

const { JWT_KEY } = config

async function verifyToken (token: string) {
  try {
    const decoded = jwt.verify(token, <string>JWT_KEY)
    // @ts-ignore: Unreachable code error
    const { userId } = decoded
    const user = await userRepository.show(userId)
    return user instanceof Object
  } catch (e:any) {
    return false
  }
}

function decodeToken (token: string) {
  return jwt.verify(token, <string>JWT_KEY)
}

function signToken (payload: string | object | Buffer) {
  return jwt.sign(payload, <string>JWT_KEY, { expiresIn: 30 * 24 * 60 * 60 })
}

async function login (email: string, password: string) {
  const user = await userRepository.findByEmail(email)

  if (!compareSync(password, <string>user?.password)) {
    throw new Error('The password or email is not correct')
  }

  const payload = { userId: user?._id, username: user?.username }
  const token = signToken(payload)
  return { user, token }
}

const authService = {
  verifyToken,
  decodeToken,
  signToken,
  login
}

export default authService
