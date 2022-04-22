import categoryModel from '../models/category.model'

async function index () {
  return await categoryModel.find()
}

async function show (id: string) {
  return await categoryModel.findById(id)
}

async function store (category: object) {
  return await categoryModel.create(category)
}

async function update (id: string, category: object) {
  return await categoryModel.findByIdAndUpdate(id, category, { new: true })
}

async function destroy (id: string) {
  return await categoryModel.findByIdAndDelete(id)
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
