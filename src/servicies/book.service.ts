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

async function store (book: object, files: any) {
  const { image, document } = files
  const bookCreated = await bookRepository.store(book)

  // If the book was created successfully then upload the files
  const imageRequest = storage.upload(image?.data, {}, { filename: image.md5 })
  const documentRequest = storage.upload(document?.data, {}, { filename: document.md5 })
  const [imageUpload, documentUpload] = await Promise.all([imageRequest, documentRequest])
  // Update with the files URL
  bookCreated.image = {
    url: imageUpload.url,
    name: imageUpload._file.name,
    mimetype: imageUpload._file.type,
    handle: imageUpload.handle
  }

  bookCreated.document = {
    url: documentUpload.url,
    name: documentUpload._file.name,
    mimetype: documentUpload._file.type,
    handle: documentUpload.handle
  }

  return await bookRepository.update(bookCreated.id, bookCreated)
}

async function update (id: string, book: any, files: any) {
  const bookToUpdate = await bookRepository.show(id)
  if (files.image) {
    const image = files.image
    const imageHandle = bookToUpdate?.image.handle
    const imageRequest = storage.upload(image?.data, {}, { filename: image.md5 })
    const imageDeleteRequest = storage.remove(<string>imageHandle)
    const [imageUpload] = await Promise.all([imageRequest, imageDeleteRequest])
    book.image = {
      url: imageUpload.url,
      name: imageUpload._file.name,
      mimetype: imageUpload._file.type,
      handle: imageUpload.handle
    }
  }

  if (files.document) {
    const document = files.document
    const documentHandle = bookToUpdate?.document.handle
    const documentRequest = storage.upload(document?.data, {}, { filename: document.md5 })
    const documentDeleteRequest = storage.remove(<string>documentHandle)
    const [documentUpload] = await Promise.all([documentRequest, documentDeleteRequest])
    book.document = {
      url: documentUpload.url,
      name: documentUpload._file.name,
      mimetype: documentUpload._file.type,
      handle: documentUpload.handle
    }
  }

  return await bookRepository.update(id, book)
}

async function destroy (id: string) {
  const book = await bookRepository.show(id)

  const imageHandle = book?.image.handle
  const documentHandle = book?.document.handle

  await bookRepository.destroy(id)

  // if book is deleted successfully then delete the files
  const imageDeleteRequest = storage.remove(<string>imageHandle)
  const documentDeleteRequest = storage.remove(<string>documentHandle)
  await Promise.all([imageDeleteRequest, documentDeleteRequest])

  return book
}

async function indexByCategory (category: string) {
  return await bookRepository.indexByCategory(category)
}

async function indexByUser (user: string) {
  return await bookRepository.indexByUser(user)
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
