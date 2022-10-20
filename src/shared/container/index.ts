import { container } from 'tsyringe';
import ICategoriesRepository from '../../modules/cars/repositories/categories-repository.interface';
import CategoriesRepository from '../../modules/cars/repositories/implementations/categories.repository';
import SpecificationsRepository from '../../modules/cars/repositories/implementations/specifications.repository';
import ISpecificationsRepository from '../../modules/cars/repositories/specifications-repository.interface';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
