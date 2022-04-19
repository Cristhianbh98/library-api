import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { trimString } from '../helpers/validation.helper'
import userService from '../servicies/user.service'
import authService from '../servicies/auth.service'

async function index (req: Request, res: Response) {
  const role = res.locals.currentUser?.role || 'subscriber'

  let users = []

  if (role === 'admin') users = await userService.index()
  else users = await userService.indexAdmins()

  return res.status(200).send(users)
}

function show (req: Request, res: Response) {
  return res.send({ message: 'Here will go a single user' })
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

function update (req: Request, res: Response) {
  return res.send(res.locals.currentUser)
}

function destroy (req: Request, res: Response) {
  return res.send()
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
  const isValid = authService.verifyToken(token)
  return res.send({ isValid })
}

const userController = {
  index,
  show,
  store,
  update,
  destroy,
  login,
  verifyToken
}

export default userController
