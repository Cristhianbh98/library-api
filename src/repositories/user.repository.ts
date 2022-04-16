import userModel from '../models/user.model'

async function index () {
  return await userModel.find()
}

async function show (id: string) {
  return await userModel.findById(id)
}

async function store (user: object) {
  return await userModel.create(user)
}

async function update (id: string, user: object) {
  return await userModel.findByIdAndUpdate(id, user, { new: true })
}

async function destroy (id: string) {
  return await userModel.findByIdAndDelete(id)
}

const userRepository = {
  index,
  show,
  store,
  update,
  destroy
}

export default userRepository
