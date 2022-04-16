import userRepository from '../repositories/user.repository'

async function store (user: object) {
  return await userRepository.store(user)
}

const userService = {
  store
}

export default userService
