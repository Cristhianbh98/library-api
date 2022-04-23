import bookRepository from '../repositories/book.repository'
import storage from '../storage'

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

async function store (book: any, files: any) {
  const { image, document } = files
  const imageUpload = await storage.upload(image?.data, {}, { filename: image.md5 })
  const documentUpload = await storage.upload(document?.data, {}, { filename: document.md5 })
  book.image = imageUpload.url
  book.document = documentUpload.url
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
