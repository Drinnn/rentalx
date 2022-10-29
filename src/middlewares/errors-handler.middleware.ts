import AppError from '@errors/app.error';
import { NextFunction, Request, Response } from 'express';

export async function errorsHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: `Internal server error: ${err.message}` });
}

export default errorsHandler;
