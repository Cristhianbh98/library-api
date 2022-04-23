import { NextFunction, Request, Response } from 'express'
import { trimString } from '../helpers/validation.helper'
import bookService from '../servicies/book.service'
import { IBook } from '../models/book.model'

async function index (req: Request, res: Response) {
  const books = await bookService.index()
  return res.send(books)
}

async function show (req: Request, res: Response) {
  const { id } = req.params
  const book = await bookService.show(id)
  return res.send(book)
}

async function store (req: Request, res: Response, next: NextFunction) {
  const { title, description, code, category } = req.body
  const image = <any>req.files?.image
  const document = <any>req.files?.document

  if (!image && !document) {
    const e = new Error()
    e.name = 'ValidationError'
    e.message = 'Image and document is necessary to create the book'
    return next(e)
  }

  if (!/^image\/(jpeg|png)$/.test(image?.mimetype)) {
    const e = new Error()
    e.name = 'ValidationError'
    e.message = 'Image extension not supported'
    return next(e)
  }

  if (document?.mimetype !== 'application/pdf') {
    const e = new Error()
    e.name = 'ValidationError'
    e.message = 'Document only support: application/pdf'
    return next(e)
  }

  const files = { image, document }

  const book = {
    title: trimString(title),
    description: trimString(description),
    code: trimString(code),
    category,
    user: res.locals.currentUser?.id
  }
  try {
    const bookCreated = await bookService.store(book, files)
    return res.send(bookCreated)
  } catch (e:any) {
    next(e)
  }
}

async function update (req: Request, res: Response, next: NextFunction) {
  const { currentUser } = res.locals
  const { id } = req.params
  const book = <IBook> await bookService.show(id)
  const canUpdate = book?.user === currentUser.id || currentUser?.role === 'admin'

  if (!canUpdate) {
    const err = new Error('JsonWebTokenError')
    err.message = 'You do not have the permisson'
    return next(err)
  }

  const { title, description, code, category } = req.body
  const image = <any>req.files?.image
  const document = <any>req.files?.document

  if (image && !/^image\/(jpeg|png)$/.test(image?.mimetype)) {
    const e = new Error()
    e.name = 'ValidationError'
    e.message = 'Image extension not supported'
    return next(e)
  }

  if (document && document?.mimetype !== 'application/pdf') {
    const e = new Error()
    e.name = 'ValidationError'
    e.message = 'Document only support: application/pdf'
    return next(e)
  }

  const files = { image, document }

  const updateData = {
    title: trimString(title),
    description: trimString(description),
    code: trimString(code),
    category
  }
  try {
    const bookUpdated = await bookService.update(id, updateData, files)
    return res.send(bookUpdated)
  } catch (e: any) {
    next(e)
  }
}

async function destroy (req: Request, res: Response, next: NextFunction) {
  const { currentUser } = res.locals
  const { id } = req.params
  const book = <IBook> await bookService.show(id)
  const canDelete = book?.user === currentUser.id || currentUser?.role === 'admin'

  if (!canDelete) {
    const err = new Error('JsonWebTokenError')
    err.message = 'You do not have the permisson'
    return next(err)
  }

  try {
    await bookService.destroy(id)
    return res.send({ message: 'successfully deleted' })
  } catch (e: any) {
    next(e)
  }
}

async function indexByCategory (req: Request, res: Response, next: NextFunction) {
  const { category } = req.params

  try {
    const books = await bookService.indexByCategory(category)
    return res.send(books)
  } catch (e:any) {
    next(e)
  }
}

async function indexByUser (req: Request, res: Response, next: NextFunction) {
  const { user } = req.params
  try {
    const books = await bookService.indexByUser(user)
    return res.send(books)
  } catch (e:any) {
    next(e)
  }
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
