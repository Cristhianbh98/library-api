import { Request, Response, NextFunction } from 'express'
import authService from '../servicies/auth.service'
import userService from '../servicies/user.service'

export default async function (req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('authorization') || ''
  const token = authorization.substring(7)
  const isValid = await authService.verifyToken(<string>token)

  if (!isValid) {
    const data = {
      status: 401,
      error: 'Authorization failed!'
    }
    return res.status(401).send(data)
  }

  const decoded = <any>authService.decodeToken(token)

  try {
    const user = await userService.show(decoded.userId)
    res.locals.currentUser = user
    next()
  } catch (e:any) {
    const data = {
      status: 401,
      error: 'Invalid user'
    }
    return res.status(401).send(data)
  }
}
