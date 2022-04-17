import { NextFunction, Request, Response } from 'express'
import userService from '../servicies/user.services'
import { trimString } from '../helpers/validation.helper'
import config from '../config'

function index (req: Request, res: Response) {
  return res.send({ route: 'Here it will show all the users for admin' })
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
    return res.send({ message: 'User created correctly', status: 200 }).status(200)
  } catch (e: any) {
    next(e)
  }
}

function update (req: Request, res: Response) {
  return res.send({ message: 'Uptade user' })
}

function destroy (req: Request, res: Response) {
  return res.send()
}

function login (req: Request, res: Response) {
  return res.send('Here it will be the login')
}

const userController = {
  index,
  show,
  store,
  update,
  destroy,
  login
}

export default userController
