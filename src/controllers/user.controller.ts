import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { trimString } from '../helpers/validation.helper'
import userService from '../servicies/user.service'
import authService from '../servicies/auth.service'

async function index (req: Request, res: Response) {
  const role = res.locals.currentUser?.role || 'subscriber'

  let users = []

  if (role === 'admin') users = await userService.index()
  else users = await userService.indexAdmin()

  return res.status(200).send(users)
}

async function show (req: Request, res: Response) {
  const { id } = req.params
  let user
  if (res.locals.currentUser?.role === 'admin') {
    user = await userService.show(id)
  } else {
    user = await userService.showAdmin(id)
  }
  return res.status(200).send(user)
}

async function store (req: Request, res: Response, next: NextFunction) {
  const { username, email, firstName, lastName, password } = req.body
  const createAdminPass = req.header('createAdminPass')
  const user = {
    username: trimString(username),
    email: trimString(email),
    firstName: trimString(firstName),
    lastName: trimString(lastName),
    password,
    role: 'subscriber'
  }

  if (config.PASSWORD_TO_CREATE_ADMIN && (createAdminPass === config.PASSWORD_TO_CREATE_ADMIN)) {
    user.role = 'admin'
  }

  try {
    await userService.store(user)
    return res.send({ message: 'User created correctly', status: 200 })
  } catch (e: any) {
    next(e)
  }
}

async function update (req: Request, res: Response, next: NextFunction) {
  const { currentUser } = res.locals
  const { id } = req.params
  const canEdit = currentUser?.id === id || currentUser?.role === 'admin'

  if (!canEdit) {
    const err = new Error('JsonWebTokenError')
    err.message = 'You do not have the permisson'
    return next(err)
  }

  const { email, firstName, lastName, password } = req.body

  const updateData = {
    email: trimString(email),
    firstName: trimString(firstName),
    lastName: trimString(lastName),
    password
  }

  try {
    await userService.update(id, updateData)
    return res.send({ message: 'Successfully updated!' })
  } catch (e: any) {
    next(e)
  }
}

async function destroy (req: Request, res: Response, next: NextFunction) {
  const { currentUser } = res.locals
  const { id } = req.params
  const canDelete = currentUser?.id === id || currentUser?.role === 'admin'

  if (!canDelete) {
    const err = new Error('JsonWebTokenError')
    err.message = 'You do not have the permisson'
    return next(err)
  }

  try {
    await userService.destroy(id)
    return res.send({ message: 'User successfully deleted!' })
  } catch (e: any) {
    next(e)
  }
}

async function login (req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  try {
    const data = await authService.login(email, password)
    return res.send(data)
  } catch (e: any) {
    next(e)
  }
}

async function verifyToken (req: Request, res: Response, next: NextFunction) {
  const { token } = req.body
  const isValid = await authService.verifyToken(token)
  return res.send({ isValid })
}

async function emailExists (req: Request, res: Response, next: NextFunction) {
  const { email } = req.body
  const isTaken = await userService.emailExists(email)
  return res.send({ isTaken })
}

async function usernameExists (req: Request, res: Response, next: NextFunction) {
  const { username } = req.body
  const isTaken = await userService.usernameExists(username)
  return res.send({ isTaken })
}

const userController = {
  index,
  show,
  store,
  update,
  destroy,
  login,
  verifyToken,
  emailExists,
  usernameExists
}

export default userController
