import { NextFunction, Request, Response } from 'express'
import favoriteService from '../servicies/favorite.service'
import { IFavorite } from '../models/favorite.model'

async function list (req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.currentUser
  let favorite = await favoriteService.show(id)
  if (!favorite) favorite = await favoriteService.store({ user: id, books: [] })
  return res.send(favorite)
}

async function add (req: Request, res: Response, next: NextFunction) {
  const { bookId } = req.body
  const { id } = res.locals.currentUser
  const favorite = await favoriteService.show(id)

  if (!favorite) {
    const favoriteData: IFavorite = { user: id, books: [bookId] }
    try {
      await favoriteService.store(favoriteData)
      return res.send({ message: 'Added to favorite correctly' })
    } catch (e:any) {
      next(e)
    }
  } else {
    const index = favorite.books.indexOf(bookId)

    if (index < 0) {
      const err = new Error()
      err.message = 'You did have that book in favorites before'
      return next(err)
    }

    const favoriteData: IFavorite = {
      user: favorite.user,
      books: favorite.books.concat(bookId)
    }
    try {
      await favoriteService.update(id, favoriteData)
      return res.send({ message: 'Added to favorite correctly' })
    } catch (e:any) {
      next(e)
    }
  }
}

async function remove (req: Request, res: Response, next: NextFunction) {
  const { bookId } = req.body
  const { id } = res.locals.currentUser
  const favorite = await favoriteService.show(id)

  if (!favorite) {
    const err = new Error()
    err.message = 'You did not have that book in favorites before'
    return next(err)
  }

  const index = favorite.books.indexOf(bookId)

  if (index < 0) {
    const err = new Error()
    err.message = 'You did not have that book in favorites before'
    return next(err)
  }

  favorite.books.splice(index, 1)

  const favoriteData: IFavorite = {
    user: favorite.user,
    books: favorite.books
  }

  try {
    await favoriteService.update(id, favoriteData)
    return res.send({ message: 'Added to favorite correctly' })
  } catch (e:any) {
    next(e)
  }
}

export default {
  add,
  remove,
  list
}
