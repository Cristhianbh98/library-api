import bookModel from '../models/book.model'

async function index () {
  return await bookModel.find()
}

async function show (id: string) {
  return await bookModel.findById(id)
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

export default {
  index,
  show,
  store,
  update,
  destroy
}
