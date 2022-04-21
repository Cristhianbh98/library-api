import { Request, Response, NextFunction } from 'express'
import userService from '../servicies/user.service'
import authService from '../servicies/auth.service'

export default async function (req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('authorization') || ''
  const token = authorization.substring(7)
  const isValid = await authService.verifyToken(<string>token)

  if (isValid) {
    try {
      const decoded = <any>authService.decodeToken(token)
      const user = await userService.show(decoded.userId)
      res.locals.currentUser = user
    } catch (e:any) {
      const data = {
        status: 401,
        error: 'Invalid user'
      }
      return res.status(401).send(data)
    }
  }

  next()
}
