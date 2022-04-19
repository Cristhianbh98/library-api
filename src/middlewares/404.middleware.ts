import { Request, Response } from 'express'

function notFound (req: Request, res: Response) {
  const data = {
    status: 404,
    mesage: '404 not found'
  }

  return res.status(404).send(data)
}

export default notFound
