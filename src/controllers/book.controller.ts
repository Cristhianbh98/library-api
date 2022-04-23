import { NextFunction, Request, Response } from 'express'
import { trimString } from '../helpers/validation.helper'
import bookService from '../servicies/book.service'

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
  const { title, description, code, category, user } = req.body
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
    user
  }
  try {
    const bookCreated = await bookService.store(book, files)
    return res.send(bookCreated)
  } catch (e:any) {
    next(e)
  }
}

async function update (req: Request, res: Response, next: NextFunction) {
  return res.send('This is the update function')
}

async function destroy (req: Request, res: Response, next: NextFunction) {
  return res.send('This is the destroy function')
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
