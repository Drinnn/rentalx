import { container } from 'tsyringe';
import ICategoriesRepository from '../../modules/cars/repositories/categories-repository.interface';
import CategoriesRepository from '../../modules/cars/repositories/implementations/categories.repository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
