import CategoriesRepository from '../../repositories/categories.repository';
import ListCategoriesController from './list-categories.controller';
import ListCategoriesUseCase from './list-categories.use-case';

export const listCategoriesRepository = CategoriesRepository.getInstance();
export const listCategoriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository,
);
export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);
