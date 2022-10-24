import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
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
    throw new Error('Missing token.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);
    if (!user) {
      throw new Error(`User doesn't exists.`);
    }

    next();
  } catch (err) {
    throw new Error('Invalid token.');
  }
}

export default ensureAuthenticated;
