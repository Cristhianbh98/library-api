import favoriteModel from '../models/favorite.model'

async function show (id: string) {
  return await favoriteModel.findOne({ user: id })
}

async function store (favorite: object) {
  return await favoriteModel.create(favorite)
}

async function update (id: string, favorite: object) {
  return await favoriteModel.findOneAndUpdate({ user: id }, favorite, { new: true })
}

async function list (id: string) {
  return await favoriteModel.findOne({ user: id }).populate({ path: 'books', model: 'book' })
}

export default {
  show,
  store,
  update,
  list
}
