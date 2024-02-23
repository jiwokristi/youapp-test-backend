import { Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (error: Error, req: Request, res: Response) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors.map((err) => err.message).join(', ')
    return res
      .status(400)
      .json({ error: `Zod Validation Error: ${errorMessage}` })
  }

  console.error('Unhandled Error:', error.message)
  return res.status(500).json({ error: 'Internal Server Error' })
}
