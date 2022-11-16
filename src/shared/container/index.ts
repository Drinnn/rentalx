import { container } from 'tsyringe';
import '@shared/container/providers';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/users.repository';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/categories.repository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/specifications.repository';
import ISpecificationsRepository from '@modules/cars/repositories/specifications-repository.interface';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/cars.repository';
import ICarsImagesRepository from '@modules/cars/repositories/cars-images-repository.interface';
import CarsImagesRepository from '@modules/cars/infra/typeorm/repositories/cars-images.repository';
import IRentalsRepository from '@modules/rentals/repositories/rentals-repository.interface';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/rentals.repository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersReposito  ry',
  UsersRepository,
);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
