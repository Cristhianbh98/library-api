import bookRepository from '../repositories/book.repository'

async function index () {
  return await bookRepository.index()
}

async function show (id: string) {
  try {
    return await bookRepository.show(id)
  } catch (e: any) {
    return {}
  }
}

async function store (book: object) {
  return await bookRepository.store(book)
}

async function update (id: string, book: object) {
  return await bookRepository.update(id, book)
}

async function destroy (id: string) {
  return await bookRepository.destroy(id)
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
