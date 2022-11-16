import UsersRepository from '@modules/accounts/infra/typeorm/repositories/users.repository';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/categories.repository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/specifications.repository';
import ISpecificationsRepository from '@modules/cars/repositories/specifications-repository.interface';
import { container } from 'tsyringe';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/cars.repository';
import ICarsImagesRepository from '@modules/cars/repositories/cars-images-repository.interface';
import CarsImagesRepository from '@modules/cars/infra/typeorm/repositories/cars-images.repository';

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
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);
