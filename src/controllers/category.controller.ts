import { NextFunction, Request, Response } from 'express'
import categoryService from '../servicies/category.service'
import { trimString } from '../helpers/validation.helper'

async function index (req: Request, res: Response) {
  const categories = await categoryService.index()
  return res.send(categories)
}

async function show (req: Request, res: Response) {
  const { id } = req.params
  const category = await categoryService.show(id)
  return res.send(category)
}

async function store (req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body
  const data = { name: trimString(name), description: trimString(description) }

  try {
    const category = await categoryService.store(data)
    return res.send(category)
  } catch (e:any) {
    next(e)
  }
}

async function update (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const { description } = req.body
  try {
    const categoryUpdated = await categoryService.update(id, { description: trimString(description) })
    return res.send(categoryUpdated)
  } catch (e:any) {
    next(e)
  }
}

async function destroy (req: Request, res: Response, next: NextFunction) {
  const { currentUser } = res.locals
  const { id } = req.params
  const canDelete = currentUser?.role === 'admin'

  if (!canDelete) {
    const err = new Error('JsonWebTokenError')
    err.message = 'You do not have the permisson'
    return next(err)
  }

  try {
    await categoryService.destroy(id)
    return res.send({ message: 'Category successfully deleted!' })
  } catch (e: any) {
    next(e)
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy
}
