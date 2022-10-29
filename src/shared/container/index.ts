import UsersRepository from '@modules/accounts/infra/typeorm/repositories/users.repository';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/categories.repository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/specifications.repository';
import ISpecificationsRepository from '@modules/cars/repositories/specifications-repository.interface';
import { container } from 'tsyringe';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
