import UsersRepository from '@modules/accounts/infra/typeorm/repositories/users.repository';
import AppError from '@shared/errors/app.error';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user } = req;

  const usersRepository = container.resolve(UsersRepository);
  const isUserAdmin = (await usersRepository.findById(user.id)).admin;

  if (!isUserAdmin) {
    throw new AppError('User must be an admin.', 403);
  }

  next();
}

export default ensureAdmin;
