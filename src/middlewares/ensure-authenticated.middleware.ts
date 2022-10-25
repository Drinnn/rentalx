import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/app.error';
import UsersRepository from '../modules/accounts/repositories/implementations/users.repository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Missing token.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);
    if (!user) {
      throw new AppError(`User doesn't exists.`, 401);
    }

    next();
  } catch (err) {
    throw new AppError('Invalid token.', 401);
  }
}

export default ensureAuthenticated;