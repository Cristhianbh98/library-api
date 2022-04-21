import categoryRepository from '../repositories/category.repository'

async function index () {
  return await categoryRepository.index()
}

async function show (id: string) {
  try {
    return await categoryRepository.show(id)
  } catch (e: any) {
    return {}
  }
}

async function store (category: object) {
  return await categoryRepository.store(category)
}

async function update (id: string, category: object) {
  return await categoryRepository.update(id, category)
}

async function destroy (id: string) {
  return await categoryRepository.destroy(id)
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
