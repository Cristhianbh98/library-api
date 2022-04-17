import { Request, Response, NextFunction } from 'express'

const ERROR_HANDLERS = {
  defaultError: (res: Response, err: Error) => res.status(400).send({ status: 400, error: err.message }),
  JsonWebTokenError: (res: Response, err: Error) => res.status(401).send({ status: 401, error: err.message }),
  ValidationError: (res: Response, err: Error) => res.status(409).send({ status: 409, error: err.message }),
  EntityNotFound: (res: Response, err: Error) => res.status(404).send({ status: 404, error: err.message })
}

type ErrorHandleKeys = keyof typeof ERROR_HANDLERS

function errorMiddleware (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) {
    console.log(err.name)
    const errorName = <ErrorHandleKeys> err.name
    const handler = ERROR_HANDLERS[errorName] || ERROR_HANDLERS.defaultError
    return handler(res, err)
  }

  next()
}

export default errorMiddleware
