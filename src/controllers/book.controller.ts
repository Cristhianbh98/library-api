import { NextFunction, Request, Response } from 'express'
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
  return res.send('This is the store function')
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
