import bookModel from '../models/book.model'

async function index () {
  return await bookModel.find().populate('category').populate('user')
}

async function show (id: string) {
  return await bookModel.findById(id).populate('category').populate('user')
}

async function store (book: Object) {
  return await bookModel.create(book)
}

async function update (id: string, book: object) {
  return await bookModel.findByIdAndUpdate(id, book, { new: true })
}

async function destroy (id: string) {
  return await bookModel.findByIdAndDelete(id)
}

async function indexByCategory (category: string) {
  return await bookModel.find({ category }).populate('category').populate('user')
}

async function indexByUser (user: string) {
  return await bookModel.find({ user }).populate('category').populate('user')
}

export default {
  index,
  show,
  store,
  update,
  destroy,
  indexByCategory,
  indexByUser
}
