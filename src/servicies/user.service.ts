import userRepository from '../repositories/user.repository'

async function index () {
  return await userRepository.index()
}

async function show (id: string) {
  return await userRepository.show(id)
}

async function store (user: object) {
  return await userRepository.store(user)
}

async function indexAdmins () {
  return await userRepository.indexAdmins()
}

const userService = {
  store,
  show,
  index,
  indexAdmins
}

export default userService
