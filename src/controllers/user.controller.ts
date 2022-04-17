import { NextFunction, Request, Response } from 'express'
import userService from '../servicies/user.services'

function index (req: Request, res: Response) {
  return res.send({ route: 'Here it will show all the users for admin' })
}

function show (req: Request, res: Response) {
  return res.send({ message: 'Here will go a single user' })
}

async function store (req: Request, res: Response, next: NextFunction) {
  const { username, email, firstName, lastName, password } = req.body
  const user = {
    username,
    email,
    firstName,
    lastName,
    password
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

const userController = {
  index,
  show,
  store,
  update,
  destroy
}

export default userController
