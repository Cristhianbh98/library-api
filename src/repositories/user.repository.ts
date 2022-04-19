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

async function findByEmail (email: string) {
  return await userModel.findOne({ email })
}

async function indexAdmins () {
  return await userModel.find({ role: 'admin' })
}

const userRepository = {
  index,
  show,
  store,
  update,
  destroy,
  findByEmail,
  indexAdmins
}

export default userRepository
