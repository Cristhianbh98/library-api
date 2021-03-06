import userRepository from '../repositories/user.repository'

async function index () {
  return await userRepository.index()
}

async function show (id: string) {
  try {
    return await userRepository.show(id)
  } catch (e: any) {
    return {}
  }
}

async function store (user: object) {
  return await userRepository.store(user)
}

async function update (id: string, user: object) {
  return await userRepository.update(id, user)
}

async function destroy (id: string) {
  return await userRepository.destroy(id)
}

async function indexAdmin () {
  return await userRepository.indexAdmin()
}

async function showAdmin (id: string) {
  try {
    return await userRepository.showAdmin(id)
  } catch (e: any) {
    return {}
  }
}

async function emailExists (email: string) {
  try {
    const user = await userRepository.findByEmail(email)
    return user instanceof Object
  } catch (e: any) {
    return false
  }
}

async function usernameExists (username: string) {
  try {
    const user = await userRepository.findByUsername(username)
    return user instanceof Object
  } catch (e: any) {
    return false
  }
}

const userService = {
  index,
  show,
  store,
  update,
  destroy,
  emailExists,
  usernameExists,
  indexAdmin,
  showAdmin
}

export default userService
