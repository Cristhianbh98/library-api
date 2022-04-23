import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  console.log(req.method, req.path, req.body)
  if (req.files) console.log({ files: req.files })
  next()
}
